<?php

function wp_gote_advanced_plugin_app_admin_scripts( $hook ) {
    
    if( $hook != 'wp-gote-advanced-plugin-app.php' ) {
        
            if ( is_admin () ) {
              wp_enqueue_media ();   
            }
        
    
        wp_enqueue_script( 'wp-gote-advanced-plugin-app-vendor', SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'build/js/vendor-scripts.js', array('jquery'), PLUGIN_VERSION, false );
        
        wp_enqueue_script( 'tinymce_js', includes_url( 'js/tinymce/' ) . 'wp-tinymce.php', array( 'jquery' ), false, false ); 

        wp_enqueue_script( 'wp-gote-advanced-plugin-app', SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'build/js/wp-gote-advanced-plugin-app.js', array(), PLUGIN_VERSION, false );

        wp_enqueue_style( 'wp-gote-advanced-plugin-app-styles', SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'build/css/styles.css', array(), PLUGIN_VERSION, 'all' );

        wp_localize_script( 'wp-gote-advanced-plugin-app', 'wp_gote_advanced_plugin_app_local',
            array(
                'baseURL' => get_home_url(),
                'api_url' => get_rest_url(),
                'template_directory' => SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'views',
                'app_directory' => SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'app',
                'build_directory' => SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'build',
                'bower_directory'  => SIMPLE_WP_ANGULARJS_STARTER_APP_URL . 'bower_components',
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'current_user_id' => (int) get_current_user_id(),
                
                // in order to make this app translatable by Wordpress core I18n internationalization:
                // translation settings
                
                // Status
                'wpTranslation_draft'       => __( 'Draft ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_pending'     => __( 'Pending ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_future'      => __( 'Future ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_publish'     => __( 'Publish ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_private'     => __( 'Private ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_trash'       => __( 'Trash ', 'wp-gote-advanced-plugin-app' ),
                
                
                // Comment options
                'wpTranslation_accept'      => __( 'accept ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_refuse'      => __( 'refuse ', 'wp-gote-advanced-plugin-app' ),
                
                // search section component
                'wpTranslation_filter'              => __( 'Filter ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_posts_per_page'      => __( 'Posts per page ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_total_items'         => __( 'Total items ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_filtered'            => __( 'filtered ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_in_t_n_c'     => __( 'search in title and content ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_in_info_1'    => __( 'type in at least 3 letters ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_in_info_2'    => __( 'Hit enter to start searching ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_filter_by_category'  => __( 'filter by category ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_filter_by_tag'       => __( 'filter by tag ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_filter_by_author'    => __( 'filter by author ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_filter_by_status'    => __( 'filter by status ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_reset_filter'        => __( 'reset filter ', 'wp-gote-advanced-plugin-app' ),
                
                // Main table in main view
                'wpTranslation_media'           => __( 'Media ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_featured_media'  => __( 'Featured media ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_title'           => __( 'Title ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_categories'      => __( 'Categories ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_no_categories'   => __( 'No categories ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_tags'            => __( 'Tags ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_no_tags'         => __( 'No tags ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_expert'          => __( 'Expert ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_experts'         => __( 'Experts ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_actions'         => __( 'Actions ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_details'         => __( 'Details ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_edit'            => __( 'Edit ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_close'            => __( 'Close ', 'wp-gote-advanced-plugin-app' ),
                
                'wpTranslation_posts'               => __( 'Posts ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_pages'               => __( 'Pages ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_post_details'        => __( 'Post details ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_page_details'        => __( 'Page details ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_filter'              => __( 'Filter ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_load_more'              => __( 'load more ', 'wp-gote-advanced-plugin-app' ),
                
                
                // Error handling
                'wpTranslation_upps_nothing_found'      => __( 'Upps! No thing found. ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_maybe_filter_not_match'  => __( 'Maybe your search filter does not match any post/ page?', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_if_then_reset_app'       => __( 'If nothing helps, reset the GOTE Advanced Plugin App ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_reset_app_txt'           => __( 'reset GOTE Adv. Plugin App ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_no_data_lost_txt'        => __( 'Do not worry! Your data will not be lost. ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_type_at_least_txt'       => __( 'Type in at least 3 letters. ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_hit_enter_txt'           => __( 'Hit enter to start searching.', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_by_cat'           => __( 'search by category ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_by_tag'           => __( 'search by tag ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_by_author'        => __( 'search by author ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_search_by_status'        => __( 'search by status ', 'wp-gote-advanced-plugin-app' ),
                        
                'wpTranslation_back'                    => __( 'back ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_create_new_post'         => __( 'Create new post ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_create_new_page'         => __( 'Create new page ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_edit_post'               => __( 'Edit post ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_edit_post_details'       => __( 'Edit post attributes ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_edit_page'               => __( 'Edit page ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_edit_page_details'       => __( 'Edit page attributes ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_publish_new_post'        => __( 'Publish new post ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_publish_new_page'        => __( 'Publish new page ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_changes_made'            => __( 'Changes made ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_reset_changes'           => __( 'reset changes ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_update_post'             => __( 'Update post ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_update_page'             => __( 'Update page ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_title_n_post_content_required'=> __( 'Title and post content are required. ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_title_n_page_content_required'=> __( 'Title and page content are required. ', 'wp-gote-advanced-plugin-app' ),
                'wpTranslation_on_status_date_n_time_required'=> __( 'On selected status, date and time are required. ', 'wp-gote-advanced-plugin-app' ),
            )
        );
    }
}

?>