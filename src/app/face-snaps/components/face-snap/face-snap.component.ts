import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/model/face-snap.model';
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {


  @Input() faceSnap! : FaceSnap;

  constructor(private faceSnapService: FaceSnapsService, private router: Router) {}
  ngOnInit(): void {}
  onViewFaceSnap(){
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`)
  }
}
