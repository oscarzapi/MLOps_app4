import { useState } from 'react';
import '../App.css';

function Home() {
  return (
    <div className="Home">
      <JsonForm></JsonForm>
    </div>
  );
}

export default Home;


const JsonForm = () => {
    const [jsonValues, setJsonValues] = useState(
        {"Marital_status": 1,
  "Application_mode": 7,
  "Application_order": 0,
  "Course": 9003,
  "Daytime_evening_attendance": 1,
  "Previous_qualification": 3,
  "Previous_qualification_grade": 130.0,
  "Nacionality": 1,
  "Mothers_qualification": 1,
  "Fathers_qualification": 37,
  "Mothers_occupation": 4,
  "Fathers_occupation": 9,
  "Admission_grade": 130.0,
  "Displaced": 1,
  "Educational_special_needs": 0,
  "Debtor": 0,
  "Tuition_fees_up_to_date": 1,
  "Gender": 0,
  "Scholarship_holder": 0,
  "Age_at_enrollment": 23,
  "International": 0,
  "Curricular_units_1st_sem_credited": 10,
  "Curricular_units_1st_sem_enrolled": 17,
  "Curricular_units_1st_sem_evaluations": 28,
  "Curricular_units_1st_sem_approved": 17,
  "Curricular_units_1st_sem_grade": 13.15,
  "Curricular_units_1st_sem_without_evaluations": 2,
  "Curricular_units_2nd_sem_credited": 8,
  "Curricular_units_2nd_sem_enrolled": 12,
  "Curricular_units_2nd_sem_evaluations": 22,
  "Curricular_units_2nd_sem_approved": 12,
  "Curricular_units_2nd_sem_grade": 13.214285714285714,
  "Curricular_units_2nd_sem_without_evaluations": 0,
  "Unemployment_rate": 15.5,
  "Inflation_rate": 2.8,
  "GDP": -4.06,
    "prediction":"",
    "probability":null}
    )

    const list = ['Marital_status', 'Application_mode', 'Application_order', 'Course',
    'Daytime_evening_attendance', 'Previous_qualification',
    'Previous_qualification_grade', 'Nacionality', 'Mothers_qualification',
    'Fathers_qualification', 'Mothers_occupation', 'Fathers_occupation',
    'Admission_grade', 'Displaced', 'Educational_special_needs', 'Debtor',
    'Tuition_fees_up_to_date', 'Gender', 'Scholarship_holder',
    'Age_at_enrollment', 'International',
    'Curricular_units_1st_sem_credited',
    'Curricular_units_1st_sem_enrolled',
    'Curricular_units_1st_sem_evaluations',
    'Curricular_units_1st_sem_approved', 'Curricular_units_1st_sem_grade',
    'Curricular_units_1st_sem_without_evaluations',
    'Curricular_units_2nd_sem_credited',
    'Curricular_units_2nd_sem_enrolled',
    'Curricular_units_2nd_sem_evaluations',
    'Curricular_units_2nd_sem_approved', 'Curricular_units_2nd_sem_grade',
    'Curricular_units_2nd_sem_without_evaluations', 'Unemployment_rate',
    'Inflation_rate', 'GDP']

    const handleValue = (event) => {
        setJsonValues({...jsonValues, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        const url = "http://localhost:8000/scoreJson"
        const reqOpt = {method: "POST",  headers: {"Content-type": "application/json"},  body: JSON.stringify(jsonValues)}
        fetch(url,reqOpt)
        .then((resp) => resp.json())
        .then((respJ) => {
            const result = (Object.entries(respJ.score.x).reduce((a, b) => a[1] > b[1] ? a : b)[1])*100
            
            const keyResult = Object.entries(respJ.score.x).reduce((a, b) => a[1] > b[1] ? a : b)[0]
            console.log(result, keyResult)
            setJsonValues({...jsonValues, "prediction": keyResult, "probability": result})
        } ) //
    }

    const listItems = list.map((item,id) => {
        return (
            <tr key={id}>
                            <td>
                                {item}
                            </td>
                            <td>
                            <input type="text" value={jsonValues[item]} name={item} onChange={e => handleValue(e)}></input>
                            </td>
                        </tr>
        )
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
                <input type="submit" value="submit"></input>
                </form>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                {jsonValues.probability > 0 && <td>This student is likely to {jsonValues.prediction} with a propability of {jsonValues.probability} %</td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    )
}