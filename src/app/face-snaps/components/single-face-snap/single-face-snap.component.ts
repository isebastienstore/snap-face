import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../../../core/model/face-snap.model";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit{

  /*
  Pour qu'une propriété puisse être injectée depuis
   l'extérieur d'un component, il faut lui ajouter le décorateur  @Input()
   */
 // faceSnap! : FaceSnap;
  messageButtom! : string;
  faceSnaps$!: Observable<FaceSnap>;

  constructor(private faceSnapService: FaceSnapsService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.messageButtom = "Oh snaps";
    //+ est un typecast qui permet de changer le type d'une variable, un string en un nombre par exemple
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnaps$ = this.faceSnapService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number){
    if(this.messageButtom == "Oh snaps"){
     this.faceSnaps$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(()=> this.messageButtom = 'Oops unSnaps')
      );
    }
    else{
      this.faceSnaps$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(()=> this.messageButtom = 'Oh snaps')
      );
    }
  }
}
