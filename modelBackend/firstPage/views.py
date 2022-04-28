from django.shortcuts import render
from django.http import JsonResponse
import json
import pandas as pd
from django.core.files.storage import FileSystemStorage
import joblib

# Create your views here.
#model=joblib.load('../model/modelPipeline.pkl')
model=joblib.load('modelPipeline.pkl')

def scoreJson(request):
    data =json.loads(request.body)
    dataF=pd.DataFrame({'x':data}).transpose()
    score=model.predict_proba(dataF)
    scoreOutput={j:{'Dropout':k[0],'Graduate':k[1],'Enrolled':k[2]} for j,k in zip(dataF.index,score)}

    print(scoreOutput)
    

    return JsonResponse({'score':scoreOutput})


def scoreFile(request):
    fileObj=request.FILES['filePath']
    fs=FileSystemStorage()
    filePathName=fs.save(fileObj.name,fileObj)
    filePathName=fs.url(filePathName)
    filePath='.'+filePathName

    dataFile =pd.read_csv(filePath)
    score=model.predict_proba(dataFile)
    scoreOutput={j:{'id': j, 'Dropout':round(k[0]*100,2),'Graduate':round(k[1]*100,2),'Enrolled': round(k[2]*100, 2)} for j,k in zip(dataFile.index,score)}

    return JsonResponse({'result':scoreOutput})