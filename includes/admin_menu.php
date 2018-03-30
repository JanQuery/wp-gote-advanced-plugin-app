<?php

function wp_gote_advanced_plugin_app_menu(){

  $page_title = 'GOTE Advanced';
  $menu_title = 'GOTE Advanced';
  $capability = 'manage_options';
  $menu_slug  = 'wp-gote-advanced-plugin-app';
  $function   = 'wp_gote_advanced_plugin_app_admin_page';
  $icon_url   =  plugin_dir_url(__FILE__) . '../app/img/gote-logo-24px.png';
  $position   = 4;

  add_menu_page( $page_title,
                 $menu_title, 
                 $capability, 
                 $menu_slug, 
                 $function, 
                 $icon_url, 
                 $position );
}

function wp_gote_advanced_plugin_app_admin_page() {

        echo
            '<div ng-app="simpleWpAularjsPluginStarter">                  
                        
                <div>
                    <div id="main-content" ui-view class="fadeIn fadeOut"></div>
                </div>
                
            </div>';

    }


?>