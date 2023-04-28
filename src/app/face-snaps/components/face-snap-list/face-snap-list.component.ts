import {Component, OnDestroy, OnInit} from '@angular/core';
import { FaceSnap } from '../../../core/model/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import {interval, Observable, Subject, takeUntil} from "rxjs";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps$!: Observable<FaceSnap[]>;

  destroy$!: Subject<boolean>;//Subject est un observable que l'on peut faire emmetre à la demande, destroy$ ne
  // va emmettre qu'une seule fois


  constructor(private faceSnapService: FaceSnapsService){}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
/*
    interval(1000).pipe(
      take(3),//pour le control du nombre des emmissions
      takeUntil(this.destroy$),//Cet opérateur dit à l'Observable  interval  de continuer à émettre tant que  destroy$  n'a pas émis, mais dès que  destroy$  émet, de compléter l'Observable.
      tap(console.log)   //console.log est la contraction de l'expression value => console.log(value)
    ).subscribe();

 */
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);//Pour faire emmettre un Subject on appelle sa methode next()
  }

}
