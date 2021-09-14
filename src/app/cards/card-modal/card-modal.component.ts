import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardFrom!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb:FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
    ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.cardFrom = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.address || '', Validators.maxLength(500)],
    })
  }

  addCard(): void{
    console.log(this.cardFrom.value);
    this.showSpinner = true;
    this.cardService.addCard(this.cardFrom.value)
    .subscribe((res:any)=> {
      console.log(res);
      
      this.getSuccess(res || 'Kartvizit başarıyla eklendi.');

      /*
       this._snackBar.open(res || 'Kartvizit başarıyla eklendi.', '' , {
        duration: 4000
      });

      this.cardService.getCards();

      this.showSpinner = false;

      //this.dialogRef.close(true);
      this.dialogRef.close();*/
    }
    ,(err)=> {
      this.getError(err.message || "Kartvizit eklenirken bir sorun oluştu.");
    });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardFrom.value, this.data.id)
    .subscribe(
      (res)=> {
      console.log(res);
      this.getSuccess(res || 'Kartvizit başarıyla güncellendi.');
      /*this._snackBar.open(res || 'Kartvizit başarıyla güncellendi.', '' , {
        duration: 4000
      });

      this.cardService.getCards();
      this.showSpinner = false;
      this.dialogRef.close();
      //this.dialogRef.close(true);*/
    },
    (err)=> {
      this.getError(err.message || "Kartvizit güncellenirken bir sorun oluştu.");
    });
  }

  deleteCard():void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
    .subscribe((res) => {
      this.getSuccess(res || 'Kartvizit başarıyla silindi.');
    },(err)=> {
      this.getError(err.message || "Kartvizit silinrken bir sorun oluştu.");
    });
  }

  getSuccess(message: string): void {
    // this._snackBar.open(message, '' , {
    //   duration: 4000
    // });
    this.snackbarService.createSnackBar('success', message);

    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    // this._snackBar.open(message, '' , {
    //   duration: 4000
    // });
    this.snackbarService.createSnackBar('error', message);

    this.showSpinner = false;
  }
}
