export class UrlWebServices {

    private static readonly companyPreFix = '/company/';
    private static readonly dealerPreFix = '/dealer/';
    private static readonly devolutionPreFix = '/devolution/';
    private static readonly epcPreFix = '/epc/';
    private static readonly inventoryPreFix = '/inventory/';
    private static readonly consolidatedInventoryPreFix = '/ci/';
    private static readonly inventoryErpPreFix = '/inventory-erp/';
    private static readonly pdfPreFix = '/pdf/';
    private static readonly productPreFix = '/product/';
    private static readonly reportPreFix = '/report/';
    private static readonly sellPreFix = '/sell/';
    private static readonly shopPreFix = '/shop/';
    private static readonly supplierPreFix = '/supplier/';
    private static readonly transferPreFix = '/transfer/';
    private static readonly userPreFix = '/user/';
    private static readonly zonePreFix = '/zone/';


    static readonly Company = {
        getCompaniesByDealer:  UrlWebServices.companyPreFix + 'getCompaniesByDealer',
        getCompanyById:        UrlWebServices.companyPreFix + 'getCompanyById',
        getEmployeesByAdmin:   UrlWebServices.companyPreFix + 'getEmployeesByAdmin',
        update:                UrlWebServices.companyPreFix + 'update',
    };
    static readonly Dealer = {
        create:                 UrlWebServices.dealerPreFix + 'create',
        getAllActiveDealers:    UrlWebServices.dealerPreFix + 'getAllActiveDealers',
        getAllDealers:          UrlWebServices.dealerPreFix + 'getAllDealers',
        update:                 UrlWebServices.dealerPreFix + 'update',
    };
    static readonly Devolution = {
        returnProducts:                 UrlWebServices.devolutionPreFix + 'returnProducts'
    };
    static readonly Epc = {
        create:                  UrlWebServices.epcPreFix + 'create',
        tagsByCompanyByMonth:    UrlWebServices.epcPreFix + 'getAllActiveDealers',
        tagsByDealerByMonth:     UrlWebServices.epcPreFix + 'getAllDealers'
    };
    static readonly Inventory = {
        attach:                         UrlWebServices.inventoryPreFix + 'attach',
        consolidate:                    UrlWebServices.inventoryPreFix + 'consolidate',
        create:                         UrlWebServices.inventoryPreFix + 'create',
        list:                           UrlWebServices.inventoryPreFix + 'list',
        listProductsByInventory:   UrlWebServices.inventoryPreFix + 'list-products-by-inventory',
    };
    static readonly ConsolidateInventory = {
        lastInventory:              UrlWebServices.consolidatedInventoryPreFix + 'lastInventory',
        lastInventoryByEmployee:    UrlWebServices.consolidatedInventoryPreFix + 'lastInventoryByEmployee',
        listAll:                    UrlWebServices.consolidatedInventoryPreFix + 'listAll',
        listByCollaborative:        UrlWebServices.consolidatedInventoryPreFix + 'listByCollaborative',
    };
    static readonly InventoryErp = {
        create:              UrlWebServices.inventoryErpPreFix + 'create',
    };
    static readonly Pdf = {
        createPdf:              UrlWebServices.pdfPreFix + 'createPdf',
    };
    static readonly Product = {
        create :                            UrlWebServices.productPreFix + 'create',
        findOne :                        UrlWebServices.productPreFix + 'find-one',
        findByEpc :                     UrlWebServices.productPreFix + 'find-by-epc',
        findAll :                        UrlWebServices.productPreFix + 'find-all',
        import :                            UrlWebServices.productPreFix + 'import',
        update :                            UrlWebServices.productPreFix + 'update',
        addCommodity :                   UrlWebServices.productPreFix + 'add-commodity',
        findProductsInLocalById :    UrlWebServices.productPreFix + 'find-products-in-local-by-id',
        findProductsInLocalByEpc :   UrlWebServices.productPreFix + 'find-products-in-local-by-epc',
    };
    static readonly Report = {
        differenceBetweenInventories:   UrlWebServices.reportPreFix + 'difference-between-inventories',
        saveReport:                      UrlWebServices.reportPreFix + 'save-report',
        getReportsByType:              UrlWebServices.reportPreFix + 'get-reports-by-type',
        getReportById:                 UrlWebServices.reportPreFix + 'get-report-by-id',
        homologateUnits:                 UrlWebServices.reportPreFix + 'homologate-units',
        saleUnits:                       UrlWebServices.reportPreFix + 'sale-units',
        rotationUnits:                   UrlWebServices.reportPreFix + 'rotation-units',
        devolutionsByType:              UrlWebServices.reportPreFix + 'devolutions-by-type',
        rotationProyectedByEanPlu:    UrlWebServices.reportPreFix + 'rotation-proyected-by-ean-plu',
        differenceWithInventoryErp:    UrlWebServices.reportPreFix + 'difference-with-inventory-erp',
    };
    static readonly Sell = {
        createSell: UrlWebServices.sellPreFix + 'create-sell'
    };
    static readonly Shop = {
        createShop:              UrlWebServices.shopPreFix + 'create-shop',
        findShopsByCompany:    UrlWebServices.shopPreFix + 'find-shops-by-company',
    };
    static readonly Supplier = {
        createSupplier:            UrlWebServices.supplierPreFix + 'create-supplier',
        findSuppliersByCompany:  UrlWebServices.supplierPreFix + 'find-suppliers-by-company',
        updateSupplier:  UrlWebServices.supplierPreFix + 'update-supplier',
    };
    static readonly Transfer = {
        createTransfer:        UrlWebServices.transferPreFix + 'create-transfer',
        getTransfersByType:  UrlWebServices.transferPreFix + 'get-transfers-by-type',
        getTransfersByShop:  UrlWebServices.transferPreFix + 'get-transfers-by-shop',
        finishTransfer:        UrlWebServices.transferPreFix + 'finish-transfer',
    };
    static readonly User = {
        createEmployee:              UrlWebServices.userPreFix + 'create-employee',
        createAdmin:                 UrlWebServices.userPreFix + 'create-admin',
        updateAdmin:                 UrlWebServices.userPreFix + 'update-admin',
        login:                          UrlWebServices.userPreFix + 'login',
        loginWeb:                    UrlWebServices.userPreFix + 'login-web',
        sync:                           UrlWebServices.userPreFix + 'sync',
        findEmployeeByUsername:    UrlWebServices.userPreFix + 'find-employee-by-username',
        modifyEmployeeByUsername:  UrlWebServices.userPreFix + 'modify-employee-by-username',
        listEmployeesByCompany:    UrlWebServices.userPreFix + 'list-employees-by-company',
        changeEmployeeState:        UrlWebServices.userPreFix + 'change-employee-state',
    };
    static readonly Zone = {
        createZone:         UrlWebServices.zonePreFix + 'create-zone',
        listZonesByShop:    UrlWebServices.zonePreFix + 'list-zones-by-shop',
        findZonesByShop:    UrlWebServices.zonePreFix + 'find-zones-by-shop',
        updateZone:    UrlWebServices.zonePreFix + 'update-zone',
    };


}
