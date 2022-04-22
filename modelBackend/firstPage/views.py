from django.shortcuts import render
from django.http import JsonResponse
import json
import pandas as pd
from django.core.files.storage import FileSystemStorage
import joblib

# Create your views here.
model=joblib.load('../model/modelPipeline.pkl')

def scoreJson(request):
    data =json.loads(request.body)
    dataF=pd.DataFrame({'x':data}).transpose()
    score=model.predict_proba(dataF)
    scoreOutput={j:{'Dropout':k[0],'Graduate':k[1],'Enrolled':k[2]} for j,k in zip(dataF.index,score)}

    print(scoreOutput)
    

    return JsonResponse({'score':scoreOutput})
