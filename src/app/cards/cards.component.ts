import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  //cards!: Card[];
  // cardItem = {
  //   title: 'Frontend',
  //   name: 'Cem Elma',
  //   phone: '0531 350 00 00',
  //   email: 'cem.elma@cts.com.tr',
  //   address: 'İzmir'
  // }
  
  constructor(
    public dialog: MatDialog,
    public cardService:CardService
    ) { }

  ngOnInit(): void {
    //this.getCards();
    this.cardService.getCards();
  }

  openAddCardModal(): void
  {
    this.dialog.open(CardModalComponent, { width: '400px', height: '600px' });

    // dialog.afterClosed().subscribe(res => {
    //   console.log(res);

    //   if (res)
    //   {
    //     this.getCards();
    //   }
    // })
  }

  // getCards() : void{
  //   this.cardService.getCards()
  //   .subscribe((res: Card[]) => {
  //     console.log(res);
  //     this.cards = res;
  //   })
  // }
}
