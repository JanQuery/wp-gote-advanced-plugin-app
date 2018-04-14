/*global wp_gote_advanced_plugin_app_local, wp_gote_advanced_plugin_app */
wp_gote_advanced_plugin_app.app.factory('wpTranslation', function () {


    var data = {
        
        // Status Options
        "draft":                                        wp_gote_advanced_plugin_app_local.wpTranslation_draft,
        "pending":                                      wp_gote_advanced_plugin_app_local.wpTranslation_pending,
        "future":                                       wp_gote_advanced_plugin_app_local.wpTranslation_future,
        "publish":                                      wp_gote_advanced_plugin_app_local.wpTranslation_publish,
        "private":                                      wp_gote_advanced_plugin_app_local.wpTranslation_private,
        "trash":                                        wp_gote_advanced_plugin_app_local.wpTranslation_trash,
        
        // Comment Options
        "accept":                                       wp_gote_advanced_plugin_app_local.wpTranslation_accept,
        "refuse":                                       wp_gote_advanced_plugin_app_local.wpTranslation_refuse,
        
        // search section component
        "search_by_cat":                                wp_gote_advanced_plugin_app_local.wpTranslation_search_by_cat,
        "search_by_tag":                                wp_gote_advanced_plugin_app_local.wpTranslation_search_by_tag,
        "search_by_author":                             wp_gote_advanced_plugin_app_local.wpTranslation_search_by_author,
        "search_by_status":                             wp_gote_advanced_plugin_app_local.wpTranslation_search_by_status,
        "posts_per_page":                               wp_gote_advanced_plugin_app_local.wpTranslation_posts_per_page,
        "total_items":                                  wp_gote_advanced_plugin_app_local.wpTranslation_total_items,
        "filtered":                                     wp_gote_advanced_plugin_app_local.wpTranslation_filtered,
        "search_in_t_n_c":                              wp_gote_advanced_plugin_app_local.wpTranslation_search_in_t_n_c,
        "search_in_info_1":                             wp_gote_advanced_plugin_app_local.wpTranslation_search_in_info_1,
        "search_in_info_2":                             wp_gote_advanced_plugin_app_local.wpTranslation_search_in_info_2,
        "filter_by_category":                           wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_category,
        "filter_by_tag":                                wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_tag,
        "filter_by_author":                             wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_author,
        "filter_by_status":                             wp_gote_advanced_plugin_app_local.wpTranslation_filter_by_status,
        "reset_filter":                                 wp_gote_advanced_plugin_app_local.wpTranslation_reset_filter,
        
        // Main table in main content
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
        "media":                                        wp_gote_advanced_plugin_app_local.wpTranslation_media,
        "featured_media":                               wp_gote_advanced_plugin_app_local.wpTranslation_featured_media,
        "title":                                        wp_gote_advanced_plugin_app_local.wpTranslation_title,
        "categories":                                   wp_gote_advanced_plugin_app_local.wpTranslation_categories,
        "no_categories":                                wp_gote_advanced_plugin_app_local.wpTranslation_no_categories,
        "tags":                                         wp_gote_advanced_plugin_app_local.wpTranslation_tags,
        "no_tags":                                      wp_gote_advanced_plugin_app_local.wpTranslation_no_tags,
        "expert":                                       wp_gote_advanced_plugin_app_local.wpTranslation_expert,
        "experts":                                      wp_gote_advanced_plugin_app_local.wpTranslation_experts,
        "actions":                                      wp_gote_advanced_plugin_app_local.wpTranslation_actions,
        "details":                                      wp_gote_advanced_plugin_app_local.wpTranslation_details,
        "edit":                                         wp_gote_advanced_plugin_app_local.wpTranslation_edit,
        "close":                                        wp_gote_advanced_plugin_app_local.wpTranslation_close,
        
        "posts":                                        wp_gote_advanced_plugin_app_local.wpTranslation_posts,
        "pages":                                        wp_gote_advanced_plugin_app_local.wpTranslation_pages,
        "post_details":                                 wp_gote_advanced_plugin_app_local.wpTranslation_post_details,
        "page_details":                                 wp_gote_advanced_plugin_app_local.wpTranslation_page_details,
        "filter":                                       wp_gote_advanced_plugin_app_local.wpTranslation_filter,
        "load_more":                                    wp_gote_advanced_plugin_app_local.wpTranslation_load_more,
        
<<<<<<< HEAD
        // Error handlinng
        "upps_nothing_found":                           wp_gote_advanced_plugin_app_local.wpTranslation_upps_nothing_found,
        "maybe_filter_not_match":                     wp_gote_advanced_plugin_app_local.wpTranslation_maybe_filter_not_match,
        "if_then_reset_app":                            wp_gote_advanced_plugin_app_local.wpTranslation_if_then_reset_app,
        "reset_app_txt":                                wp_gote_advanced_plugin_app_local.wpTranslation_reset_app_txt,
        "no_data_lost_txt":                             wp_gote_advanced_plugin_app_local.wpTranslation_no_data_lost_txt,
        "type_at_least_txt":                            wp_gote_advanced_plugin_app_local.wpTranslation_type_at_least_txt,
        "hit_enter_txt":                                wp_gote_advanced_plugin_app_local.wpTranslation_hit_enter_txt,
        "back":                                         wp_gote_advanced_plugin_app_local.wpTranslation_back,
        
=======
        "media": wp_gote_advanced_plugin_app_local.wpTranslation_media,
        "featured_media": wp_gote_advanced_plugin_app_local.wpTranslation_featured_media,
        "title": wp_gote_advanced_plugin_app_local.wpTranslation_title,
        "categories": wp_gote_advanced_plugin_app_local.wpTranslation_categories,
        "no_categories": wp_gote_advanced_plugin_app_local.wpTranslation_no_categories,
        "tags": wp_gote_advanced_plugin_app_local.wpTranslation_tags,
        "no_tags": wp_gote_advanced_plugin_app_local.wpTranslation_no_tags,
        "expert": wp_gote_advanced_plugin_app_local.wpTranslation_expert,
        "experts": wp_gote_advanced_plugin_app_local.wpTranslation_experts,
        "actions": wp_gote_advanced_plugin_app_local.wpTranslation_actions,
        "details": wp_gote_advanced_plugin_app_local.wpTranslation_details,
        "edit": wp_gote_advanced_plugin_app_local.wpTranslation_edit,
        "close": wp_gote_advanced_plugin_app_local.wpTranslation_close,

        "posts": wp_gote_advanced_plugin_app_local.wpTranslation_posts,
        "pages": wp_gote_advanced_plugin_app_local.wpTranslation_pages,
        "post_details": wp_gote_advanced_plugin_app_local.wpTranslation_post_details,
        "page_details": wp_gote_advanced_plugin_app_local.wpTranslation_page_details,
        "filter": wp_gote_advanced_plugin_app_local.wpTranslation_filter,
        "load_more": wp_gote_advanced_plugin_app_local.wpTranslation_load_more,

        // Error handlinng
        "upps_nothing_found": wp_gote_advanced_plugin_app_local.wpTranslation_upps_nothing_found,
        "maybe_filter_not_match": wp_gote_advanced_plugin_app_local.wpTranslation_maybe_filter_not_match,
        "if_then_reset_app": wp_gote_advanced_plugin_app_local.wpTranslation_if_then_reset_app,
        "reset_app_txt": wp_gote_advanced_plugin_app_local.wpTranslation_reset_app_txt,
        "no_data_lost_txt": wp_gote_advanced_plugin_app_local.wpTranslation_no_data_lost_txt,
        "type_at_least_txt": wp_gote_advanced_plugin_app_local.wpTranslation_type_at_least_txt,
        "hit_enter_txt": wp_gote_advanced_plugin_app_local.wpTranslation_hit_enter_txt,
        "back": wp_gote_advanced_plugin_app_local.wpTranslation_back,

>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
=======
        // Error handlinng
        "upps_nothing_found":                           wp_gote_advanced_plugin_app_local.wpTranslation_upps_nothing_found,
        "maybe_filter_not_match":                     wp_gote_advanced_plugin_app_local.wpTranslation_maybe_filter_not_match,
        "if_then_reset_app":                            wp_gote_advanced_plugin_app_local.wpTranslation_if_then_reset_app,
        "reset_app_txt":                                wp_gote_advanced_plugin_app_local.wpTranslation_reset_app_txt,
        "no_data_lost_txt":                             wp_gote_advanced_plugin_app_local.wpTranslation_no_data_lost_txt,
        "type_at_least_txt":                            wp_gote_advanced_plugin_app_local.wpTranslation_type_at_least_txt,
        "hit_enter_txt":                                wp_gote_advanced_plugin_app_local.wpTranslation_hit_enter_txt,
        "back":                                         wp_gote_advanced_plugin_app_local.wpTranslation_back,
        
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
        // Editing post/ pages
        "create_new_post":                              wp_gote_advanced_plugin_app_local.wpTranslation_create_new_post,
        "create_new_page":                              wp_gote_advanced_plugin_app_local.wpTranslation_create_new_page,
        "edit_post":                                    wp_gote_advanced_plugin_app_local.wpTranslation_edit_post,
        "edit_post_details":                            wp_gote_advanced_plugin_app_local.wpTranslation_edit_post_details,
        "edit_page":                                    wp_gote_advanced_plugin_app_local.wpTranslation_edit_page,
        "edit_page_details":                            wp_gote_advanced_plugin_app_local.wpTranslation_edit_page_details,
        "publish_new_post":                             wp_gote_advanced_plugin_app_local.wpTranslation_publish_new_post,
        "publish_new_page":                             wp_gote_advanced_plugin_app_local.wpTranslation_publish_new_page,
        "changes_made":                                 wp_gote_advanced_plugin_app_local.wpTranslation_changes_made,
        "reset_changes":                                wp_gote_advanced_plugin_app_local.wpTranslation_reset_changes,
        "update_post":                                  wp_gote_advanced_plugin_app_local.wpTranslation_update_post,
        "update_page":                                  wp_gote_advanced_plugin_app_local.wpTranslation_update_page,
        "title_n_post_content_required":       wp_gote_advanced_plugin_app_local.wpTranslation_title_n_post_content_required,
        "title_n_page_content_required":       wp_gote_advanced_plugin_app_local.wpTranslation_title_n_page_content_required,
        "on_status_date_n_time_required":     wp_gote_advanced_plugin_app_local.wpTranslation_on_status_date_n_time_required,
        
    }
    
    var wpTranslation = {        
        
        // Status Options
        getTranslation_draft: function () {
            return data.draft;
        },
        getTranslation_pending: function () {
            return data.pending;
        },
        getTranslation_future: function () {
            return data.future;
        },
        getTranslation_publish: function () {
            return data.publish;
        },
        getTranslation_private: function () {
            return data.private;
        },
        getTranslation_trash: function () {
            return data.trash;
        },
        
        
        // Comment Options
        getTranslation_accept: function () {
            return data.accept;
        },
        getTranslation_refuse: function () {
            return data.refuse;
        },
        
        
        // search section component
        getTranslation_search_by_cat: function () {
            return data.search_by_cat;
        },
        getTranslation_search_by_tag: function () {
            return data.search_by_tag;
        },
        getTranslation_search_by_author: function () {
            return data.search_by_author;
        },
        getTranslation_search_by_status: function () {
            return data.search_by_status;
        },
        getTranslation_posts_per_page: function () {
            return data.posts_per_page;
        },
        getTranslation_total_items: function () {
            return data.total_items;
        },
        getTranslation_filtered: function () {
            return data.filtered;
        },
        getTranslation_search_in_t_n_c: function () {
            return data.search_in_t_n_c;
        },
        getTranslation_search_in_info_1: function () {
            return data.search_in_info_1;
        },
        getTranslation_search_in_info_2: function () {
            return data.search_in_info_2;
        },
        getTranslation_filter_by_category: function () {
            return data.filter_by_category;
        },
        getTranslation_filter_by_tag: function () {
            return data.filter_by_tag;
        },
        getTranslation_filter_by_author: function () {
            return data.filter_by_author;
        },
        getTranslation_filter_by_status: function () {
            return data.filter_by_status;
        },
        getTranslation_reset_filter: function () {
            return data.reset_filter;
        },
        
        // Main table in main content
        getTranslation_media: function () {
            return data.media;
        },
        getTranslation_featured_media: function () {
            return data.featured_media;
        },
        getTranslation_title: function () {
            return data.title;
        },
        getTranslation_categories: function () {
            return data.categories;
        },
        getTranslation_no_categories: function () {
            return data.no_categories;
        },
        getTranslation_tags: function () {
            return data.tags;
        },
        getTranslation_no_tags: function () {
            return data.no_tags;
        },
        getTranslation_expert: function () {
            return data.expert;
        },
        getTranslation_experts: function () {
            return data.experts;
        },
        getTranslation_actions: function () {
            return data.actions;
        },
        getTranslation_details: function () {
            return data.details;
        },
        getTranslation_edit: function () {
            return data.edit;
        },
        getTranslation_close: function () {
            return data.close;
        },
        
        
        getTranslation_posts: function () {
            return data.posts;
        },
        getTranslation_pages: function () {
            return data.pages;
        },
        getTranslation_post_details: function () {
            return data.post_details;
        },
        getTranslation_page_details: function () {
            return data.page_details;
        },
        getTranslation_filter: function () {
            return data.filter;
        },
        getTranslation_load_more: function () {
            return data.load_more;
        },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        getTranslation_status: function () {
            return data.status;
        },
=======
>>>>>>> parent of d9d6f12... dev
        
=======

>>>>>>> 74c6171a9cac5697cd29bd8560581d2cfaca6bfc
=======
        
>>>>>>> parent of 74c6171... Merge pull request #1 from linuxluigi/master
        // Error handling
        getTranslation_upps_nothing_found: function () {
            return data.upps_nothing_found;
        },
        getTranslation_maybe_filter_not_match: function () {
            return data.maybe_filter_not_match;
        },
        getTranslation_if_then_reset_app: function () {
            return data.if_then_reset_app;
        },
        getTranslation_reset_app_txt: function () {
            return data.reset_app_txt;
        },
        getTranslation_no_data_lost_txt: function () {
            return data.no_data_lost_txt;
        },
        getTranslation_type_at_least_txt: function () {
            return data.type_at_least_txt;
        },
        getTranslation_hit_enter_txt: function () {
            return data.hit_enter_txt;
        },
        getTranslation_back: function () {
            return data.back;
        },
        getTranslation_create_new_post: function () {
            return data.create_new_post;
        },
        getTranslation_create_new_page: function () {
            return data.create_new_page;
        },
        getTranslation_edit_post: function () {
            return data.edit_post;
        },
        getTranslation_edit_post_details: function () {
            return data.edit_post_details;
        },
        getTranslation_edit_page: function () {
            return data.edit_page;
        },
        getTranslation_edit_page_details: function () {
            return data.edit_page_details;
        },
        getTranslation_publish_new_post: function () {
            return data.publish_new_post;
        },
        getTranslation_publish_new_page: function () {
            return data.publish_new_page;
        },
        getTranslation_changes_made: function () {
            return data.changes_made;
        },
        getTranslation_reset_changes: function () {
            return data.reset_changes;
        },
        getTranslation_update_post: function () {
            return data.update_post;
        },
        getTranslation_update_page: function () {
            return data.update_page;
        },
        getTranslation_title_n_post_content_required: function () {
            return data.title_n_post_content_required;
        },
        getTranslation_title_n_page_content_required: function () {
            return data.title_n_page_content_required;
        },
        getTranslation_on_status_date_n_time_required: function () {
            return data.on_status_date_n_time_required;
        }
        
    }

    
    return wpTranslation;
});