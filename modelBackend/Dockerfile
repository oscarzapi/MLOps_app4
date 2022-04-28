# base image  
FROM python:3.8   

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# create root directory
RUN mkdir /web

# set working directory
WORKDIR /web

# Coppy current directory contents into the container
ADD . /web/

# install dependencies  
RUN pip install --upgrade pip  

# run this command to install all dependencies  
RUN pip install -r requirements.txt  
# port where the Django app runs  

EXPOSE 8000  
# start server  
CMD python manage.py runserver