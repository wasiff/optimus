import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  errors = [];
  selectedLedger;
  debit = 0;
  credit = 0;
  error = '';
  success = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'ledger': new FormArray([])
    });

    if ((<FormArray>this.form.get('ledger')).length <= 0) {
      this.onAddLedger();
      this.onAddLedger();
    }

    this.form.valueChanges.subscribe(
      values => {
        this.debit = 0;
        this.credit = 0;
        values.ledger.forEach(
          v => {
            if (v.credit) {
              this.credit += v.credit;
            }

            if (v.debit) {
              this.debit += v.debit;
            }

          }
        );
      }
    );
  }

  onSubmit() {
    if (this.debit !== this.credit) {
      this.error = 'Total must be equal';
      this.success = '';
    } else {
      this.error = '';
      this.success = 'Form Submitted';
    }

  }

  onAddLedger() {
    const control = new FormGroup({
      'ledger': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      'debit': new FormControl(null),
      'credit': new FormControl(null)
    });
    (<FormArray>this.form.get('ledger')).push(control);
  }

  searchLedger(term) {
    return this.apiService.getLedger();
  }

  onLedgerSelected(ledger: any) {
    this.selectedLedger = ledger;
  }
}
