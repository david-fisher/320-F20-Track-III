# Generated by Django 3.1.1 on 2020-10-13 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20201007_2131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='home',
            name='conclusion',
            field=models.CharField(max_length=500),
        ),
    ]