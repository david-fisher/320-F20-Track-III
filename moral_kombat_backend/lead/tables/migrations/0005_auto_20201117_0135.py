# Generated by Django 3.1.1 on 2020-11-17 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0004_auto_20201116_2233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scenarios',
            name='VERSION',
            field=models.IntegerField(default=1, editable=False),
        ),
    ]