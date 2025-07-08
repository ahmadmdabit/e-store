flowchart TB
    %% Layer: Client/Web UI
    subgraph "Client/Web UI" 
        direction TB
        WEB_ROOT["WEB (src/EStore/WEB)"]:::ui
        WEB_CTRL["Controllers"]:::ui
        WEB_VIEWS["Views (Razor)"]:::ui
        WEB_ASSETS["Static Assets\n(wwwroot/css, js, lib)"]:::ui
        WEB_MW["JwtMiddleware"]:::ui
        WEB_REST["RestClientServiceProvider"]:::ui
        WEB_CFG["Program.cs\nappsettings.json\nnlog.config"]:::ui
    end

    %% Layer: API Gateway
    subgraph "API Gateway" 
        direction TB
        API_ROOT["API (src/EStore/API)"]:::api
        API_CTRL["Controllers\n(Base, Login, Store)"]:::api
        API_MW["Exception & Jwt Middleware"]:::api
        API_ATTR["Attributes\n(AllowAnonymous, Authorize)"]:::api
        API_DI["DI & Extensions"]:::api
        API_CFG["Program.cs\nappsettings.json\nnlog.config"]:::api
    end

    %% Layer: Business Logic Layer
    subgraph "Business Logic Layer" 
        direction TB
        BLL_ROOT["BLL (src/EStore/BLL)"]:::bll
        BLL_BASE["BaseBusiness & IBusiness"]:::bll
        BLL_LOGIN["Login Services"]:::bll
        BLL_STORE["Store Services & Features"]:::bll
    end

    %% Layer: Data Access Layer
    subgraph "Data Access Layer" 
        direction TB
        DAL_ROOT["DAL (src/EStore/DAL)"]:::dal
        DAL_CTX["DatabaseContext & Migrations"]:::dal
        DAL_ENT_BASE["Entities (Base)"]:::dal
        DAL_ENT_LOGIN["Entities (Login)"]:::dal
        DAL_ENT_STORE["Entities (Store & Features)"]:::dal
        DAL_MODELS["Models (ApiResult, ErrorResult, etc.)"]:::dal
        DAL_REPO["Repositories (Base, Login, Store)"]:::dal
        DAL_MIG["Migrations"]:::dal
    end

    %% Layer: Shared Common Library
    subgraph "Shared Common Library" 
        direction TB
        COMN_ROOT["COMN (src/EStore/COMN)"]:::comn
        COMN_ATTR["Attributes"]:::comn
        COMN_CONST["HttpConstants"]:::comn
        COMN_EXT["Extensions"]:::comn
    end

    %% External Database
    DB["SQL Server Database"]:::db

    %% Relationships / Data Flow
    Browser["Browser"]:::external
    Browser -->|"HTTP(S) Pages & Assets"| WEB_ROOT
    WEB_ROOT -->|"REST Calls (JSON)"| API_ROOT
    API_ROOT -->|"Calls Services"| BLL_ROOT
    BLL_ROOT -->|"Calls Repositories"| DAL_ROOT
    DAL_ROOT -->|"EF Core CRUD"| DB
    WEB_ROOT -->|"Uses COMN Utilities"| COMN_ROOT
    API_ROOT -->|"Uses COMN Utilities"| COMN_ROOT
    BLL_ROOT -->|"Uses COMN Utilities"| COMN_ROOT
    DAL_ROOT -->|"Uses COMN Utilities"| COMN_ROOT

    %% Click Events: WEB
    click WEB_ROOT "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/WEB"
    click WEB_CTRL "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/WEB/Controllers"
    click WEB_VIEWS "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/WEB/Views"
    click WEB_ASSETS "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/WEB/wwwroot/css"
    click WEB_ASSETS "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/WEB/wwwroot/js"
    click WEB_ASSETS "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/WEB/wwwroot/lib"
    click WEB_MW "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/WEB/Helpers/Middlewares/JwtMiddleware.cs"
    click WEB_REST "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/WEB/Helpers/Services/RestClientServiceProvider.cs"
    click WEB_CFG "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/WEB/Program.cs"
    click WEB_CFG "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/WEB/appsettings.json"
    click WEB_CFG "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/WEB/nlog.config"

    %% Click Events: API
    click API_ROOT "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/API"
    click API_CTRL "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/API/Controllers"
    click API_MW "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Middlewares/ExceptionMiddleware.cs"
    click API_MW "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Middlewares/JwtMiddleware.cs"
    click API_ATTR "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Attributes/AllowAnonymousAttribute.cs"
    click API_ATTR "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Attributes/AuthorizeAttribute.cs"
    click API_DI "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Extensions/DIExtensions.cs"
    click API_DI "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Extensions/CorsExtensions.cs"
    click API_DI "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Helpers/Extensions/ExceptionMiddlewareExtensions.cs"
    click API_CFG "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/Program.cs"
    click API_CFG "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/appsettings.json"
    click API_CFG "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/API/nlog.config"

    %% Click Events: BLL
    click BLL_ROOT "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/BLL"
    click BLL_BASE "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/BLL/Businesses/Base/BaseBusiness.cs"
    click BLL_BASE "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/BLL/Businesses/Base/IBusiness.cs"
    click BLL_LOGIN "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/BLL/Businesses/Login"
    click BLL_STORE "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/BLL/Businesses/Store"

    %% Click Events: DAL
    click DAL_ROOT "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/DAL"
    click DAL_CTX "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/DataContext/DatabaseContext.cs"
    click DAL_CTX "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/DataContext/OptionsBuild.cs"
    click DAL_CTX "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/DataContext/MigrationsHelper.cs"
    click DAL_ENT_BASE "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/Entities/Base/BaseEntity.cs"
    click DAL_ENT_BASE "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/Entities/Base/IEntity.cs"
    click DAL_ENT_LOGIN "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/DAL/Entities/Login"
    click DAL_ENT_STORE "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/DAL/Entities/Store"
    click DAL_MODELS "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/Models/Api/ApiResult.cs"
    click DAL_MODELS "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/Models/Api/ErrorResult.cs"
    click DAL_REPO "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/Repositories/Base/BaseRepository.cs"
    click DAL_REPO "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/Repositories/Base/IRepository.cs"
    click DAL_MIG "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/DAL/Migrations"
    click DAL_ROOT "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/DAL/DAL.csproj"

    %% Click Events: COMN
    click COMN_ROOT "https://github.com/ahmadmdabit/e-store/tree/main/src/EStore/COMN"
    click COMN_ATTR "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Attributes/IncludeAttribute.cs"
    click COMN_ATTR "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Attributes/ExcludeAttribute.cs"
    click COMN_ATTR "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Attributes/ParentKeyAttribute.cs"
    click COMN_CONST "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Constants/HttpConstants.cs"
    click COMN_EXT "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Extensions/IEnumerableExtensions.cs"
    click COMN_EXT "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Extensions/ObjectExtensions.cs"
    click COMN_EXT "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/Extensions/ReflectionExtensions.cs"
    click COMN_ROOT "https://github.com/ahmadmdabit/e-store/blob/main/src/EStore/COMN/COMN.csproj"

    %% Styles
    classDef ui fill:#a3cef1,stroke:#036,stroke-width:1px
    classDef api fill:#b8e6a3,stroke:#376,stroke-width:1px
    classDef bll fill:#fdb462,stroke:#b65,stroke-width:1px
    classDef dal fill:#cab2d6,stroke:#632,stroke-width:1px
    classDef comn fill:#c0c0c0,stroke:#666,stroke-width:1px,stroke-dasharray: 5 2
    classDef db fill:#ffffb3,stroke:#aa4,stroke-width:1px
    classDef external fill:#e5e5e5,stroke:#888,stroke-width:1px,stroke-dasharray: 2 2