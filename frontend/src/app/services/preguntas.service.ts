import { Injectable } from '@angular/core';

@Injectable()
export class PreguntasService {

    data: Array<any> = [
        {
            "id": 1,
            "pregunta": "Star",
            "respuesta": "Wars",
            "estatus": true
        },
        {
            "id": 2,
            "pregunta": "yoda",
            "respuesta": "verde",
            "estatus": true
        },
        {
            "id": 3,
            "pregunta": "obiwan",
            "respuesta": "kenobi",
            "estatus": false
        },
        {
            "id": 4,
            "pregunta": "anakin",
            "respuesta": "skywalker",
            "estatus": false
        },
        {
            "id": 5,
            "pregunta": "padme",
            "respuesta": "admidala",
            "estatus": true
        },
        {
            "id": 6,
            "pregunta": "general",
            "respuesta": "greveus",
            "estatus": false
        },
        {
            "id": 7,
            "pregunta": "darth",
            "respuesta": "vader",
            "estatus": false
        },
        {
            "id": 8,
            "pregunta": "han",
            "respuesta": "solo",
            "estatus": true
        },
        {
            "id": 9,
            "pregunta": "chewbacca",
            "respuesta": "???",
            "estatus": true
        }
    ]

    getAll(){
        return this.data;
    }

    persist(question: any){
        this.data.push(question);
    }

    update(question: any){
        this.data.forEach(data => {
            if(data["id"] === question.id){
                data["pregunta"] = question.pregunta;
                data["respuesta"] = question.respuesta
            }
        });
    }

    getLastId(): any{
        return this.data[this.data.length-1]["id"] + 1;
    }

    updateStatus(id: number){
        this.data.forEach(data => {
            if(data["id"] === id){
                data["estatus"] = data["estatus"];
            }
        });
    }


}