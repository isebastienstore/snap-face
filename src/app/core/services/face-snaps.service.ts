import { Injectable } from '@angular/core';
import { FaceSnap } from '../model/face-snap.model';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) {
  }
      getAllFaceSnaps(): Observable<FaceSnap[]>{
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
      }

      getFaceSnapById(faceSnapId: number): Observable<FaceSnap>{
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
     /*   const faceSnap= this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (!faceSnap)
          throw new Error("FaceSnap not found !");
        else
          return faceSnap;

      */
      }



      // snapType: 'snap' | 'unsnap': cette declaration oblige tout appel à cette methode à utiliser l'un des deux arguments
      snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap') :Observable<FaceSnap>{
        return this.getFaceSnapById(faceSnapId).pipe(
          map(faceSnap => ( {
            ...faceSnap,
            snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
          }) ),
          switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
            `http://localhost:3000/facesnaps/${faceSnapId}`,
            updatedFaceSnap))
        )
       /* ancienne implementation
       const faceSnap= this.getFaceSnapById(faceSnapId);
        snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;

        */
      }

      addFaceSnap(formValue: { title: string, description: string, imageUrl: string, localisation?: string }): Observable<FaceSnap> {
        return this.getAllFaceSnaps().pipe(
          map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
          map(sortedFaceSnaps => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
          map(previousFaceSnap => ({
            ...formValue,
            snaps: 0,
            createdDate: new Date(),
            id: previousFaceSnap.id + 1
          })),
          switchMap(newFacesnap => this.http.post<FaceSnap>(
            'http://localhost:3000/faceSnaps',
            newFacesnap
          ))
        );
      /*  const faceSnap: FaceSnap = {
          ...formValue,
          snaps: 0,
          createdDate: new Date(),
          id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
        };
        this.faceSnaps.push(faceSnap);

       */
      }
}
