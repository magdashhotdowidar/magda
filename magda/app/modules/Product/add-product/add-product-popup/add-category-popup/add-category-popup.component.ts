import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../../infrastructure/services/category.service";
import {ToastrService} from "ngx-toastr";
import {Category} from "../../../infrastructure/models/category";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'add-category-popup',
  templateUrl: './add-category-popup.component.html',
  styleUrls: ['./add-category-popup.component.css']
})
export class AddCategoryPopupComponent implements OnInit {

  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('new-category')newCategory:EventEmitter<Category> = new EventEmitter<Category>();
  category: Category = new Category();

  constructor(private categorytService: CategoryService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  save() {
    this.newCategory.emit(this.category);
    this.categorytService.createCategory(this.category)
      .subscribe(data => {
        this.toastr.success("SUCCESSFULLY SAVED");
      }, error => {
        this.toastr.warning("ERROR!!!");
        console.log(error)
      });
    this.category = new Category();
  }

  onSubmit(form: NgForm) {
    this.save();
    form.reset();
  }

  close() {
    this.showpopup.emit(false);
  }


}
