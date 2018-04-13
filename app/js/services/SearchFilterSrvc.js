wp_gote_advanced_plugin_app.app.factory('SearchFilter', function () {

    var data = {
        isPageOrPost: '',
        filtersAreActive: false,
        search: '',
        searchFilterQuery: '',
        searchFilterTerm: '',
        category: '',
        categoryFilterQuery: '',
        categoryFilterTerm: '',
        categoryFilterName: '',
        tag: '',
        tagFilterQuery: '',
        tagFilterTerm: '',
        tagFilterName: '',
        status: '',
        statusFilterQuery: '',
        statusFilterTerm: '',
        statusFilterName: '',
        user: '',
        authorQuery: '',
        authorId: '',
        userFilterName: '',
        totalPublicItemsOfCurUser: '',
        itemsPerPageQuery: 'per_page=',
        itemsPerPage: 10,
        curPageQuery: '&page=',
        curPage: 1

    };

    var SearchFilter = {

        getFiltersAreActive: function () {
            return data.filtersAreActive;
        },
        setFiltersAreActive: function (filtersAreActive) {
            data.filtersAreActive = filtersAreActive;
        },

        getIsPageOrPost: function () {
            return data.isPageOrPost;
        },
        setIsPageOrPost: function (isPageOrPost) {
            data.isPageOrPost = isPageOrPost;
        },

        getSearch: function () {
            return data.search;
        },
        setSearch: function (search) {
            data.search = search;
        },
        getSearchFilterQuery: function () {
            return data.searchFilterQuery;
        },
        setSearchFilterQuery: function (searchFilterQuery) {
            data.searchFilterQuery = searchFilterQuery;
        },
        getSearchFilterTerm: function () {
            return data.searchFilterTerm;
        },
        setSearchFilterTerm: function (searchFilterTerm) {
            data.searchFilterTerm = searchFilterTerm;
        },

        getCategory: function () {
            return data.category;
        },
        setCategory: function (category) {
            data.category = category;
        },
        getCategoryFilterQuery: function () {
            return data.categoryFilterQuery;
        },
        setCategoryFilterQuery: function (categoryFilterQuery) {
            data.categoryFilterQuery = categoryFilterQuery;
        },
        getCategoryFilterTerm: function () {
            return data.categoryFilterTerm;
        },
        setCategoryFilterTerm: function (categoryFilterTerm) {
            data.categoryFilterTerm = categoryFilterTerm;
        },
        getCategoryFilterName: function () {
            return data.categoryFilterName;
        },
        setCategoryFilterName: function (categoryFilterName) {
            data.categoryFilterName = categoryFilterName;
        },

        getTag: function () {
            return data.tag;
        },
        setTag: function (tag) {
            data.tag = tag;
        },
        getTagFilterQuery: function () {
            return data.tagFilterQuery;
        },
        setTagFilterQuery: function (tagFilterQuery) {
            data.tagFilterQuery = tagFilterQuery;
        },
        getTagFilterTerm: function () {
            return data.tagFilterTerm;
        },
        setTagFilterTerm: function (tagFilterTerm) {
            data.tagFilterTerm = tagFilterTerm;
        },
        getTagFilterName: function () {
            return data.tagFilterName;
        },
        setTagFilterName: function (tagFilterName) {
            data.tagFilterName = tagFilterName;
        },

        getStatus: function () {
            return data.status;
        },
        setStatus: function (status) {
            data.status = status;
        },
        getStatusFilterQuery: function () {
            return data.statusFilterQuery;
        },
        setStatusFilterQuery: function (statusFilterQuery) {
            data.statusFilterQuery = statusFilterQuery;
        },
        getStatusFilterTerm: function () {
            return data.statusFilterTerm;
        },
        setStatusFilterTerm: function (statusFilterTerm) {
            data.statusFilterTerm = statusFilterTerm;
        },
        getStatusFilterName: function () {
            return data.statusFilterName;
        },
        setStatusFilterName: function (statusFilterName) {
            data.statusFilterName = statusFilterName;
        },

        getUser: function () {
            return data.user;
        },
        setUser: function (user) {
            data.user = user;
        },
        getAuthorQuery: function () {
            return data.authorQuery;
        },
        setAuthorQuery: function (authorQuery) {
            data.authorQuery = authorQuery;
        },
        getAuthorId: function () {
            return data.authorId;
        },
        setAuthorId: function (authorId) {
            data.authorId = authorId;
        },
        getUserFilterName: function () {
            return data.userFilterName;
        },
        setUserFilterName: function (userFilterName) {
            data.userFilterName = userFilterName;
        },


        getTotalPublicItemsOfCurUser: function () {
            return data.totalPublicItemsOfCurUser;
        },
        setTotalPublicItemsOfCurUser: function (totalPublicItemsOfCurUser) {
            data.totalPublicItemsOfCurUser = totalPublicItemsOfCurUser;
        },
        getItemsPerPage: function () {
            return data.itemsPerPage;
        },
        setItemsPerPage: function (itemsPerPage) {
            data.itemsPerPage = itemsPerPage;
        },
        getItemsPerPageQuery: function () {
            return data.itemsPerPageQuery;
        },
        setItemsPerPageQuery: function (itemsPerPageQuery) {
            data.itemsPerPageQuery = itemsPerPageQuery;
        },
        getCurPageQuery: function () {
            return data.curPageQuery;
        },
        setCurPageQuery: function (curPageQuery) {
            data.curPageQuery = curPageQuery;
        },
        getCurPage: function () {
            return data.curPage;
        },
        setCurPage: function (curPage) {
            data.curPage = curPage;
        },

        reset: function () {
            data = {
                filtersAreActive: false,
                search: '',
                searchFilterQuery: '',
                searchFilterTerm: '',
                category: '',
                categoryFilterQuery: '',
                categoryFilterTerm: '',
                categoryFilterName: '',
                tag: '',
                tagFilterQuery: '',
                tagFilterTerm: '',
                tagFilterName: '',
                status: '',
                statusFilterQuery: '',
                statusFilterTerm: '',
                statusFilterName: '',
                user: '',
                authorQuery: '',
                authorId: '',
                userFilterName: '',
                totalPublicItemsOfCurUser: '',
                itemsPerPageQuery: 'per_page=',
                itemsPerPage: 10,
                curPageQuery: '&page=',
                curPage: 1
            };
        }
    };

    return SearchFilter;
});