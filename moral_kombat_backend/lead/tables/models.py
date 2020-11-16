from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator

# Create your models here.

class scenarios(models.Model):
    class Meta:
        unique_together = (('SCENARIO'), ('VERSION'))
    SCENARIO = models.AutoField(primary_key = True, editable=False)
    VERSION = models.IntegerField(default=0, editable=False)
    NAME = models.CharField(max_length = 1000)
    PUBLIC = models.BooleanField(default = False)
    NUM_CONVERSATION = models.IntegerField(default = 0)
    PROFESSOR = models.ForeignKey('professors', to_field = 'PROFESSOR', on_delete =models.CASCADE, related_name="scenarios1", default = 1)
    IS_FINISHED = models.BooleanField(default = False)
    DATE_CREATED = models.DateField(auto_now_add=True)
    # models.OneToOneField('pages', on_delete = models.CASCADE, related_name = "scenarios1", default = 1)
    # def __str__(self):
    #     return "%s the scenario" % self.name


class pages(models.Model):
    class Meta:
        unique_together = (('PAGE'), ('SCENARIO'))
    PAGE = models.AutoField(primary_key = True, editable=False)
    PAGE_CHOICES = (
        ('I', 'INTRO'),
        ('G', 'GENERIC'),
        ('R', 'REFLECTION'),
        ('S', 'STAKEHOLDER'),
        ('A', 'ACTION'),
    )
    PAGE_TYPE = models.CharField(max_length = 2, choices = PAGE_CHOICES)
    PAGE_TITLE = models.CharField(max_length = 1000)
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="pages1")
    VERSION = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="pages2")
    NEXT_PAGE = models.OneToOneField('pages', to_field = 'PAGE', on_delete = models.CASCADE, related_name = 'pages3')
    X_COORDINATE = models.IntegerField()
    Y_COORDINATE = models.IntegerField()



class reflection_questions(models.Model):
    class Meta:
        unique_together = (('PAGE'), ('REFLECTION_QUESTION'))
    PAGE = models.ForeignKey('pages', on_delete = models.CASCADE, related_name="reflection_questions1")
    REFLECTION_QUESTION = models.TextField()



class generic_page(models.Model):
    class Meta:
        unique_together = (('PAGE'), ('BODY'))
    PAGE = models.ForeignKey('pages', on_delete = models.CASCADE, related_name="generic_page1")
    BODY = models.TextField()


class stakeholder_page(models.Model):
    class Meta:
        unique_together = (('PAGE'), ('STAKEHOLDER'))
    PAGE = models.ForeignKey('pages', on_delete = models.CASCADE, related_name="stakeholder_page1")
    STAKEHOLDER = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="stakeholder_page2")


# class choices_for(models.Model):
#     class Meta:
#         unique_together = (('SCENARIO_ID'), ('VERSION_ID'), ('CHOICES'))
#     SCENARIO_ID = models.ForeignKey('scenarios', to_field = 'SCENARIO_ID', on_delete = models.CASCADE, related_name="choices_for1")
#     VERSION_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="choices_for2")
#     CHOICES = models.TextField()



class stakeholders(models.Model):
    class Meta:
        unique_together = (('STAKEHOLDER'), ('VERSION'))
    STAKEHOLDER = models.AutoField(primary_key = True, editable = False)
    SCENARIO = models.ForeignKey('scenarios', to_field = 'SCENARIO', on_delete = models.CASCADE, related_name="stakeholders2", default = 1)
    VERSION = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="stakeholders3", default = 1)
    NAME = models.CharField(max_length = 1000, default = None)
    DESCRIPTION = models.TextField()
    JOB = models.TextField()
    # MATRIX = ArrayField(ArrayField(models.IntegerField(), size = 15), size = 15)
    INTRODUCTION = models.TextField(default = '')



# class stakeholders_in(models.Model):
#     class Meta:
#         unique_together = (('STAKEHOLDER_ID'), ('SCENARIO_ID'))
#     STAKEHOLDER_ID = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="stakeholder1")
#     SCENARIO_ID = models.ForeignKey('scenarios', to_field = 'SCENARIO_ID', on_delete =models.CASCADE, related_name="stakeholder2")
    # VERSION_ID = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="stakeholder3")



class conversations(models.Model):
    class Meta:
        unique_together = (('STAKEHOLDER'), ('CONVERSATION'))
    STAKEHOLDER = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="conversations1")
    CONVERSATION = models.AutoField(default = None, primary_key = True)
    QUESTION = models.TextField()
    RESPONSE = models.TextField()



class responses(models.Model):
    class Meta:
        unique_together = (('STUDENT'), ('SCENARIO'),('VERSION'),('COURSE'))
    STUDENT = models.ForeignKey('students', on_delete = models.CASCADE, related_name="responses1")
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="responses2")
    VERSION = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="responses3")
    COURSE = models.ForeignKey('courses', on_delete = models.CASCADE, related_name="responses4")
    DATE_TAKEN = models.DateField(auto_now_add=True)
    CHOICE = models.TextField()




class conversations_had(models.Model):
    STUDENT = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had1")
    COURSE = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had2")
    SCENARIO = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had3")
    VERSION = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="conversations_had4")
    DATE_TAKEN = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="conversations_had5")
    STAKEHOLDER = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name="conversations_had6")
    SCORE = models.IntegerField()
    CONVERSATION = models.TextField()



class reflections_taken(models.Model):
    class Meta:
        unique_together = (('REFLECTIONS'), ('STUDENT'), ('COURSE'), ('SCENARIO'), ('VERSION'), ('DATE_TAKEN'))
    REFLECTIONS = models.TextField()
    STUDENT = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken1")
    COURSE = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken2")
    SCENARIO = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken3")
    VERSION = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="reflections_taken4")
    DATE_TAKEN = models.ForeignKey('responses', on_delete = models.CASCADE, related_name="reflections_taken5")



class courses(models.Model):
    COURSE = models.AutoField(default = None, primary_key = True)
    NAME = models.CharField(max_length = 1000)


class scenarios_for(models.Model):
    class Meta:
        unique_together = (('SCENARIO'), ('COURSE'), ('VERSION'))
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="scenarios_for1")
    COURSE = models.ForeignKey('courses', on_delete = models.CASCADE, related_name="scenarios_for2")
    VERSION = models.ForeignKey('scenarios',on_delete = models.CASCADE,related_name = "scenarios_for3")


class students(models.Model):
    STUDENT = models.IntegerField(primary_key = True)
    NAME = models.CharField(max_length = 100)

class demographics(models.Model):
    STUDENT = models.OneToOneField('students', on_delete = models.CASCADE, related_name = "demographics", primary_key = True)
    AGE = models.SmallIntegerField()
    GRADE_CHOICES = (
    ('FR', 'FRESHMAN'),
    ('SO', 'SOPHOMORE'),
    ('JK', 'JUNIOR'),
    ('SE', 'SENIOR'),
    ('SS', 'SUPER_SENIOR'),
    ('GR', 'GRADUATE'),
    ('OT', 'OTHER')
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
        unique_together = (('STUDENT'), ('COURSE'))
    STUDENT = models.ForeignKey('students', on_delete = models.CASCADE, related_name="students_in1")
    COURSE = models.ForeignKey(courses, to_field = 'COURSE', on_delete = models.CASCADE, related_name="students_in2")

class professors_teach(models.Model):
    class Meta:
        unique_together = (('PROFESSOR'), ('COURSE'))    
    PROFESSOR = models.ForeignKey('professors', to_field = 'PROFESSOR', on_delete = models.CASCADE, related_name="professors_teach1")
    COURSE = models.ForeignKey(courses, to_field = 'COURSE', on_delete = models.CASCADE, related_name="professors_teach2")

class professors(models.Model):
    # class Meta:
    #     unique_together = (('PROFESSOR_ID'), ('NAME'))
    PROFESSOR = models.IntegerField(primary_key = True)
    NAME = models.CharField(max_length = 1000)


class Issues(models.Model):
    class Meta:
        unique_together = (('SCENARIO'),('ISSUE'),('VERSION'))
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name = "scenario_id5", default = None)
    ISSUE = models.AutoField(default = None, primary_key = True, editable = False)
    VERSION = models.ForeignKey('scenarios',on_delete = models.CASCADE, related_name = "version_id5", default = None)
    NAME = models.CharField(max_length = 1000)
    IMPORTANCE_SCORE = models.FloatField(validators = [MinValueValidator(0.0)])


class coverage(models.Model):
    class Meta:
        unique_together = (('STAKEHOLDER'),('ISSUE'))
    STAKEHOLDER = models.ForeignKey('stakeholders', on_delete = models.CASCADE, related_name = "coverage2", default = None)
    ISSUE = models.ForeignKey('Issues', on_delete = models.CASCADE, related_name = "coverage1", default = None)
    # VERSION_ID = models.ForeignKey('stakeholders',on_delete = models.CASCADE, related_name = "coverage3", default = None)
    COVERAGE_SCORE = models.FloatField(validators = [MinValueValidator(0.0)])

class action_page(models.Model):
    class Meta:
        unique_together = (('PAGE'),('CHOICE'))
    PAGE = models.ForeignKey('pages',on_delete = models.CASCADE, related_name = 'action_page1')
    CHOICE = models.TextField()
    RESULT_PAGE = models.IntegerField()

class assigned_to(models.Model):
    class Meta:
        unique_together = (('STUDENT'),('SCENARIO'),('VERSION'))
    STUDENT = models.ForeignKey('students', on_delete = models.CASCADE, related_name="assigned_to1")
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="assigned_to2")
    VERSION = models.ForeignKey('scenarios',on_delete = models.CASCADE,related_name = "assigned_to3")

class student_times(models.Model):
    class Meta:
        unique_together = (('STUDENT'),('SCENARIO'),('VERSION'),('COURSE'),('DATE_TAKEN'),('PAGE'))
    STUDENT = models.ForeignKey('students', on_delete = models.CASCADE, related_name="student_times1")
    SCENARIO = models.ForeignKey('scenarios', on_delete = models.CASCADE, related_name="student_times2")
    VERSION = models.ForeignKey('scenarios',on_delete = models.CASCADE,related_name = "student_times3")
    COURSE = models.ForeignKey('courses',on_delete = models.CASCADE,related_name = "student_times4")
    DATE_TAKEN = models.DateField(auto_now_add=True)
    PAGE = models.ForeignKey('pages',on_delete = models.CASCADE,related_name = "student_times5")
    START_TIME = models.DateField(null = True)
    END_TIME = models.DateField(null = True)