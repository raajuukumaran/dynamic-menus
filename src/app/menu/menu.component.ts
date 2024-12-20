import { Component, OnInit } from '@angular/core';
import { Detail, Subcription } from './model';
import { MenuService } from './menu.service';
import { ToastrService } from 'ngx-toastr';
import { subscriptionObjectBuilder } from './object-builder';
import { ToastService } from '../toast/toast.service';

interface FilteredData {
  id: string;
  key: string;
  type: string;
  value: string;
  isEdit?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dataItems: Subcription[] = [];
  filteredData: FilteredData[] = [];
  selectedApplication: string = '';
  selectedFilterType: string = '';
  formRows: { key: string; type: string; value: string }[] = [];
  typeOptions: string[] = ['string', 'array', 'boolean'];
  options: any[] = [
    { name: "Invoice", description: "https://invoice.vedna.in" },
    { name: "Seller", description: "https://seller.vedna.in" },
    { name: "Purchase", description: "https://purchase.vedna.in" },
    { name: "Jobwork", description: "https://jobwork.vedna.in" }
  ];

  isEditingMode = false;
  showFooter = false;
  isApplicationSelected = false;
  filteredId: any;
  filter: any;

  constructor(
    private menuService: MenuService,
    private ToastService: ToastService,
  ) { }

  ngOnInit(): void {
    
  }

  refreshPage(): void {
    if (this.selectedApplication) {
      this.loadDataByApplication();
      this.ToastService.showToast('Selected Application Reloaded', 'success');
    } else {
      this.ToastService.showToast('No application selected to refresh', 'warning');
    }
  }
  // Updated method to handle both string and Event
  onApplicationChange(event: Event | string): void {
    if (typeof event === 'string') {
      this.selectedApplication = event;
    } else {
      const selectElement = event.target as HTMLSelectElement; // Cast the event target to HTMLSelectElement
      this.selectedApplication = selectElement.value;
    }
    this.isApplicationSelected = !!this.selectedApplication;
    this.loadDataByApplication();
  }

  onFilterChange(event: any): void {
    this.selectedFilterType = event.target.value;
  }

  loadDataByApplication(): void {
    if (this.selectedApplication) {
      this.menuService.getItems().subscribe(
        (data: Subcription[]) => {
          this.dataItems = data;
          this.filterData();
        },
        (error) => {
          console.error('Error loading data:', error);
        }
      );
    }
  }

  filterData(): void {
    this.filteredData = [];
    const dataset: any = this.dataItems.filter((data: any) => data.application === this.selectedApplication);
    if (dataset[0]) {
      this.filter = dataset[0];
      this.filteredData = dataset[0].subscription;
      this.filteredId = dataset[0].id;
    } else {
      this.filteredData = [];
      this.filteredId = "";
    }
  }

  onDeleteRow(i: any) {
    this.filteredData.splice(i, 1);
  }

  isEditing(index: number): boolean {
    return this.filteredData[index]?.isEdit || false;
  }

  addNewFormRow(): void {
    const data: any = {
      key: "",
      type: "",
      value: "",
    }
    this.filteredData.push(data);
  }

  saveAll(): void {
    if (this.selectedApplication && this.filteredId) {
      const editData = subscriptionObjectBuilder.edit(this.filter, this.filteredData);
      this.menuService.updateItem(this.filteredId, editData).subscribe(res => {
        if (res) {
          this.onApplicationChange(this.selectedApplication); // Pass the selectedApplication as a string here
          this.ToastService.showToast('Saved successfully', 'success');        }
      });
    } else {
      const newData = subscriptionObjectBuilder.create(this.filteredData, this.selectedApplication);
      this.menuService.addItem(newData).subscribe(res => {
        if (res) {
          this.ToastService.showToast('Saved successfully', 'success');
          this.onApplicationChange(this.selectedApplication); // Pass the selectedApplication as a string here
        }
      });
    }
  }

  buildSubscriptionArray(data: FilteredData): Detail[] {
    return [
      {
        key: data.key,
        type: data.type,
        value: data.value
      }
    ];
  }
}
