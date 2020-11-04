from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class scenarios(models.Model):
    class Meta:
        unique_together = (('SCENARIO_ID'), ('VERSION_ID'))
    SCENARIO_ID = models.AutoField(primary_key = True, editable=False)
    VERSION_ID = models.IntegerField(default=0, editable=False)
    NAME = models.CharField(max_length = 1000)
    SUB_TITLE = models.CharField(max_length = 1000, default = None)
    IS_FINISHED = models.BooleanField(default = False)
    PUBLIC = models.BooleanField(default = False)
    NUM_CONVERSATIONS = models.IntegerField(default = 0)
    FIRST_PAGE = models.IntegerField(default = 1)

class pages(models.Model):
    class Meta:
        unique_together = (('PAGE_ID'), ('SCENARIO'), ('VERSION_ID'))
    PAGE_ID = models.IntegerField()
    PAGE_CHOICES = (
        ('R', 'REFLECTION'),
        ('S', 'STAKEHOLDERS'),
        ('A', 'ACTION'),
    )
    PAGE_TYPE = models.CharField(max_length = 2, choices = PAGE_CHOICES)
    PAGE_TITLE = models.CharField(max_length = 1000)
    PAGE_BODY = models.TextField(default = None)
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="pages1")
    VERSION_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="pages2")
    NEXT_PAGE_ID = models.IntegerField()



class reflection_questions(models.Model):
    class Meta:
        unique_together = (('PAGE_ID'), ('REFLECTION_QUESTION'))
    PAGE_ID = models.ForeignKey('pages', on_delete = models.CASCADE, related_name="reflection_questions1")
    REFLECTION_QUESTION = models.TextField()



class generic_page(models.Model):
    class Meta:
        unique_together = (('PAGE_ID'), ('BODY'))
    PAGE_ID = models.ForeignKey('pages', on_delete = models.CASCADE, related_name="generic_page1")
    BODY = models.TextField()


class stakeholder_page(models.Model):
    class Meta:
        unique_together = (('PAGE_ID'), ('STAKEHOLDER'))
    PAGE_ID = models.ForeignKey('pages', on_delete = models.CASCADE, related_name="stakeholder_page1")
    STAKEHOLDER = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="stakeholder_page2")


class choices_for(models.Model):
    class Meta:
        unique_together = (('SCENARIO_ID'), ('VERSION_ID'), ('CHOICES'))
    SCENARIO_ID = models.ForeignKey('scenarios', to_field = 'SCENARIO_ID', on_delete = models.CASCADE, related_name="choices_for1")
    VERSION_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="choices_for2")
    CHOICES = models.TextField()



class stakeholders(models.Model):
    class Meta:
        unique_together = (('STAKEHOLDER_ID'), ('VERSION_ID'))
    STAKEHOLDER_ID = models.IntegerField()
    NAME = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="stakeholders1")
    DESC = models.TextField()
    MATRIX = ArrayField(ArrayField(models.IntegerField(), size = 15), size = 15)
    SCENARIO_ID = models.ForeignKey('scenarios', to_field = 'SCENARIO_ID', on_delete = models.CASCADE, related_name="stakeholders2")
    VERSION_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="stakeholders3")




class stakeholder_in(models.Model):
    class Meta:
        unique_together = (('STAKEHOLDER_ID'), ('SCENARIO_ID'), ('VERSION_ID'))
    STAKEHOLDER_ID = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="stakeholder1")
    SCENARIO_ID = models.ForeignKey('scenarios', to_field = 'SCENARIO_ID', on_delete =models.CASCADE, related_name="stakeholder2")
    VERSION_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="stakeholder3")



class conversations(models.Model):
    class Meta:
        unique_together = (('STAKEHOLDER_ID'), ('QUESTION'), ('RESPONSE'))
    STAKEHOLDER_ID = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="conversations1")
    QUESTION = models.TextField()
    RESPONSE = models.TextField()



class responses(models.Model):
    class Meta:
        unique_together = (('STUDENT_ID'), ('E_ID'), ('V_ID'), ('COURSE_ID'))
    STUDENT_ID = models.ForeignKey('students', on_delete = models.CASCADE, related_name="responses1")
    E_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="responses2")
    V_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="responses3")
    COURSE_ID = models.ForeignKey('courses', on_delete = models.CASCADE, related_name="responses4")
    DATE = models.DateField()
    CHOICE = models.TextField()




class conversations_had(models.Model):
    STUDENT_ID = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had1")
    COURSE_ID = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had2")
    E_ID = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had3")
    DATE = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had4")
    STAKEHOLDER_ID = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="conversations_had5")
    SCORE = models.IntegerField()
    QUESTION = models.TextField()



class reflections_taken(models.Model):
    class Meta:
        unique_together = (('REFLECTIONS'), ('STUDENT_ID'), ('COURSE_ID'), ('E_ID'), ('DATE'))
    REFLECTIONS = models.TextField()
    STUDENT_ID = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken1")
    COURSE_ID = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken2")
    E_ID = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken3")
    DATE = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken4")



class courses(models.Model):
    COURSE_ID = models.IntegerField(primary_key = True)
    NAME = models.CharField(max_length = 1000)




class scenarios_for(models.Model):
    class Meta:
        unique_together = (('SCENARIO_ID'), ('COURSE_ID'), ('VERSION_ID'))
    
    SCENARIO_ID = models.ForeignKey('scenarios', to_field = 'SCENARIO_ID', on_delete = models.CASCADE, related_name="scenarios_for1")
    COURSE_ID = models.ForeignKey('courses', on_delete = models.CASCADE, related_name="scenarios_for2")
    VERSION_ID = models.IntegerField()


class students(models.Model):
    STUDENT_ID = models.IntegerField(primary_key = True)
    NAME = models.CharField(max_length = 100)

class demographics(models.Model):
    STUDENT_ID = models.OneToOneField('students', on_delete = models.CASCADE, related_name = "demographics", primary_key = True)
    AGE = models.SmallIntegerField()
    GRADE_CHOICES = (
    ('FR', 'FRESHMAN'),
    ('SO', 'SOPHOMORE'),
    ('JK', 'JUNIOR'),
    ('SE', 'SENIOR'),
    ('OT', 'OTHER'),
    )
    GRADE = models.CharField(max_length = 2, choices = GRADE_CHOICES)
    GENDER_CHOICES = (
        ('M', 'MALE'),
        ('F', 'FEMALE'),
        ('OT', 'OTHER'),
    )
    GENDER = models.CharField(max_length = 2, choices = GENDER_CHOICES)
    RACE = models.CharField(max_length = 50)
    MAJOR = models.CharField(max_length = 100)


class students_in(models.Model):
    class Meta:
        unique_together = (('STUDENT_ID'), ('COURSE_ID'))
    STUDENT_ID = models.ForeignKey('students', on_delete = models.CASCADE, related_name="students_in1")
    COURSE_ID = models.ForeignKey(courses, to_field = 'COURSE_ID', on_delete = models.CASCADE, related_name="students_in2")

class professors_teach(models.Model):
    class Meta:
        unique_together = (('PROFESSOR_ID'), ('COURSE_ID'))    
    PROFESSOR_ID = models.ForeignKey('professors', to_field = 'PROFESSOR_ID', on_delete = models.CASCADE, related_name="professors_teach1")
    COURSE_ID = models.ForeignKey(courses, to_field = 'COURSE_ID', on_delete = models.CASCADE, related_name="professors_teach2")

class professors(models.Model):
    class Meta:
        unique_together = (('PROFESSOR_ID'), ('NAME'))
    PROFESSOR_ID = models.AutoField(primary_key = True, editable=False)
    NAME = models.CharField(max_length = 1000)

    # def __str__(self):
    #     return "%s the scenario" % self.name