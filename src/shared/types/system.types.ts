export type Department = {
  Id: number,
  Name: string
}

export type Location = {
  Id: number,
  Name: string
}

export type Group = {
  Id: number,
  Name: string,
  ClassId: number
}

export type LinkedGroup = {
  Id: number,
  DeptId: number
}

export type Subgroup = {
  Id: number,
  Name: string,
  GroupId: number
}

export type Degem = {
  Id: number,
  Name: string
}

export type Sapak = {
  Id: number,
  Name: string
}

export type Subsapak = {
  Id: number,
  SubsapakId: number,
  SubsapakName: string,
  SapakId: number,
  ClassId: number
}

export type SingleSupplierItem = {
  BarCode:number,
  SupplierId:number
}

export type CannabisItem = {
  Id: number,
  BarCode: number,
  Name: string,
  THC: number,
  CBD: number
}

export type Pharmacy = {
  Id: number,
  LocationId: number,
  Name: string,
  Address: string,
  Phone: string
}

export type PharmacyAdd = {
  LocationId: number,
  Name: string,
  Address: string,
  Phone: string
}

export type Supplier = {
  Id: number,
  Name: string,
}

export type Category = {
  Id: number,
  Name: string,
}

export type Stock = {
  Id: number,
  PharmacyId: number, 
  LocationId: number, 
  CategoryId: number, 
  SupplierId: number, 
  InStock: number, 
  ByUser: number
}

export type CatalogItem = { // catalog table
  Id: number,
  CatalogId: number,
  Name: string,
  BarCode: number,
  ClassesId: number,
  GroupId: number,
  SubGroupId: number,
  SapakId: number,
  DegemId: number,
  Shakele: boolean,
  Ariza: number,
  Archives: boolean,
  Bdate_buy: string,
  Bdate_sale: string,
  UnitAriza: string,
  SizeAriza: boolean,
  statusCalMlay: boolean,
  managed: boolean,
  NoMlay: boolean,
  length: number,
  lengthSize: boolean,
  width: number,
  widthSize: boolean,
  height: number,
  heighthSize: boolean,
  scope: number,
  scopeSize: boolean,
  weightGross: number,
  weightGrossSize: boolean,
  weightNeto: number,
  weightNetoSize: boolean,
  techula: number,
  techulaSize: boolean,
  ArchivesUser: boolean,
  flagLeaven: boolean,
  Adegem: number,
  Create_Date: Date,
  Toarc_Date: Date,
  BL_datebuy: Date,
  Pesach: boolean,
  p_loss: boolean,
}

export type UnitSize = {
  Id: number,
  Name: string
}

export type BranchType = { // branches_type table
  Id: number,
  Name: string
}

export type Branch = { // branches table
  BranchId: number,
  Name: string,
  BranchType: number,
  Percent: number,
  Weeks: number,
  TotMax: number,
  TotWeight: number,
  NetworkId: number
}

export type MigvanBranch = { // migvan_branch table
  Id: number,
  BranchId: number,
  BarCode: number,
}

export type MigvanSapak = { // migvan_sapak table
  Id: number,
  BarCode: number,
  SapakId: number,
  Code: number,
  Main: number
}

export type Peruk = {
  Id: number,
  BarCodeParent: number,
  BarCodeChild: number,
  Remark: string,
  Level: string,
  Percent: number,
}

export type SpecificPeruk = {
  BarCodeParent: number,
  Level: string,
}

export type Subbar = { // table sub_bar or sub_bar_general, תחליפים כללי, תחליפים
  Id: number,
  Name: string,
  br1: number,
  br2: number,
  br3: number,
  br4: number,
  br5: number,
  br6: number,
  br7: number,
  br8: number,
  br9: number,
  br10: number
}

export type AspakaRecord = {
  Id: number,
  SapakId: number,
  BranchId: number,
  AspakaDay: number,
  OrderDay: number,
  Wensell: number,
  days_order: number
}

export type Supsiryun = {
  Id: number,
  SapakId: number,
  GroupId: number,
  ScrId: number,
  Place: number
}

export type Scrmenu = {
  Id: number,
  Name: string
}

export type Siryun = {
  Id: number,
  CreateDate: Date,
  BarCode: number,
  ClassId: number,
  GroupId: number,
  SapakId: number,
  SapakSiryun: number | null,
  CreatedBy: number
}

export type SiryunBuild = {
  CreateDate: Date,
  BarCode: number,
  ClassId: number,
  GroupId: number,
  SapakId: number,
  SapakSiryun: number | null,
  CreatedBy: number
}

export type SiryunWhere = {
  CreateDate: string,
  BarCode: number,
  SapakId: number,
}

export type SiryunUpdate = {
  SapakSiryun: number | null,
}

export type ReservedOrder = {
  Id: number,
  DeliveryDate: Date,
  OrderDate: Date,
  BarCode: number,
  NetworkId:number,
  BranchId: number,
  ClassId: number,
  GroupId: number,
  SupplierId: number,
  OrderNum:number,
  AmountOrdered:number,
  AmountApproved: number,
  CreatedBy: number,
  IsOrderSent:number,
  RecordType:string
}

export type ReservedOrderData = {
  DeliveryDate: Date,
  OrderDate: Date,
  BarCode: number,
  NetworkId:number,
  BranchId: number,
  ClassId: number,
  GroupId: number,
  SupplierId: number,
  OrderNum:number,
  AmountOrdered:number,
  AmountApproved: number,
  CreatedBy: number,
  IsOrderSent:number,
  RecordType:string
}

export type Dorder = {
  Id: number,
  BranchId: number,
  BarCode: number,
  d1: number | null,
  d2: number | null,
  d3: number | null,
  d4: number | null,
  d5: number | null,
  d6: number | null,
  d7: number | null
}

export type Siba = {
  Id: number,
  Siba: number,
  Description: string
}

export type SibaRes = {
  Id: number,
  Name: string
}

export type InitialOrderInventory = {
  BarCode: number,
  BarCodeName: string,
  UnitId: number,
  UnitName: string,
  DepartmentId: number,
  DepartmentName: string,
  GroupId: number,
  GroupName: string,
  OrderedAmount: number | undefined
}

export type Order = {
  OrderNum: number,
  BarCode: number,
  GroupId: number,
  SapakId: number,
  AmountOrder: number,
  BranchId: number,
  CreatedBy: number,
  AspakaDate: Date,
  OrderDate: Date
}

export type InternalOrder = {
  BranchId: number,
  OrderNum: number,
  OrderDate: Date,
  BarCode: number,
  GroupId: number,
  SupplierId: number,
  AmountOrdered: number,
  DeliveryDate: Date, 
  CreatedBy: number
}

export type Inventory = {
  InventoryNumber: number,
  BarCode: number,
  Amount: number,
  BranchId: number,
  NetworkId: number,
  CreatedDate: Date,
  CreatedBy: number
}

export type Destruction = {
  DestructionNumber: number,
  DestructionReason: number,
  DestructionAuth: number,
  BarCode: number,
  Amount: number,
  BranchId: number,
  NetworkId: number,
  CreatedDate: Date,
  CreatedBy: number
}

export type Conversion = {
  ConversionNumber: number,
  ConversionReason: number,
  ConversionAuth: number,
  BarCodeFrom: number,
  BarCodeTo: number,
  Amount: number,
  BranchId: number,
  NetworkId: number,
  CreatedDate: Date,
  CreatedBy: number
}

export type Deconstruction = {
  Id: number,
  DeconstructNumber: number,
  BarCodeParent: number,
  AmountParent: number,
  BarCodeChild: number,
  AmountChild: number,
  SapakId: number,
  Comment: string,
  PrepareDate: Date,
  CreatedDate: Date,
  CreatedBy: number
}

export type CodeConversion = {
  Code: number,
  Branch: number,
  Sapak: number
}

export type User = {
  id: number,
  name: string
}

export type BranchNetwork = {
  Id: number,
  Name: string
}

export type Yedm={
  Name:string,
  snif_katan:string
}

export type Yedmivs={
  Name:string,
}

export type Yedtzs={
  Name:string,
}

export type Yeds = {
  Name: string,
  Id: number,
  fdatec: Date | null,
  tdatec: Date | null,
  date_buy: Date | null,
  rem_lines: string,
  snif_katan: string,
}

export type YedionType = {
  Id: number,
  kyed: number,
  kyedm:number,
  kyedmiv: number,
  kyedtz: number,
  rem: string,
  barcode: string,
  degem: string,
  sapakid: number,
  miv_name: string,
  kamut: number,
  price: number,
  kamutbuy: number,
  kamutsale: number,
  barcodePrice: number,
  kamutmat: number,
  gondola:number

}

export type CampaignType={
  id:number,
  begin_at: Date | null,
  end_at: Date | null,
  barcode:number,
  singular_price:number,
  price:number,
  campaign_type:number
  }

  export type SubSupplier={
    Id:number,
    SubsapakId:number,
    SubsapakName:string,
    SapakId:number,
    ClassesId:number
  }