<?php
$hero = get_field('hero', 11);
$call_to_action_block = get_field('call_to_action_block', 11);
$our_junk_removal_process = get_field('our_junk_removal_process', 11);
$what_our_clients_say = get_field('what_our_clients_say', 11);
$items_we_take = get_field('items_we_take', 11);
$what_we_remove = get_field('what_we_remove');
$explore_our_work = get_field('explore_our_work');
$responsible_disposal = get_field('responsible_disposal');
$block_1 = get_field('block_1');
$block_2 = get_field('block_2');
$why_junk_raider = get_field('why_junk_raider')
?>

<!doctype html>
<html lang="en">

<?php get_template_part('template_parts/head'); ?>

<body class="commercial-services">

<?php get_header(); ?>

<main>
	<section class="page-title page-title--stars">
        <div class="content-wrap">
            <div class="page-title-inner">
                <h1><?php echo get_the_title(); ?></h1>
                <?php echo the_excerpt(); ?>
            </div>
        </div>
    </section>
    <section class="page-title page-title--left" style="">

        <div class="content-wrap">
            <div id="map">
				<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d208333.94030573193!2d-80.9618937!3d35.3254122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a882fbf955dd%3A0xd5bb950c21bad385!2sJunk%20Raider%20-%20Junk%20Removal%20and%20Hauling%20of%20Charlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1698862566617!5m2!1sen!2sus" style="border:0;width:100%;height:100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>
        </div>
		
        <div class="contact-wrap form-container">
            <?php

                if ( function_exists( 'wpcf7_enqueue_scripts' ) ) {
                  wpcf7_enqueue_scripts();
                }
                 
                if ( function_exists( 'wpcf7_enqueue_styles' ) ) {
                  wpcf7_enqueue_styles();
                }
                
                echo do_shortcode('[contact-form-7 id="70cede6" title="Contact Us Form"]');
             
            ?>
        </div>
    </section>
	<style>
		section.page-title.page-title--left {
			display: table;
			width: 1240px;
			max-width: calc(100% - 40px);
		}
		
		.page-title--left div.content-wrap {
			height: 100%;
			display: table-cell;
			width: initial;
			position: relative;
		}
		.page-title--left div.contact-wrap {
			display: table-cell;
			width: 544px;
			vertical-align: top;
		}
		.page-title--left div#map {
			position: absolute !important;
			overflow: hidden;
			border-radius: 20px;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			height: 100%;
			width: calc(100% - 20px);
			background: #f1f6ec;
		}
		
		@media screen and (max-width: 976px) {
			section.page-title.page-title--left {
				display: flex;
    			flex-direction: column-reverse;
				max-width: 100%;
			}
			.page-title--left div.content-wrap {
				display: block;
				width: 100%;
				height: 400px;
			}
			.page-title--left div.contact-wrap {
				display: block;
			}
			.page-title--left div#map {
				position: relative !important;
    			width: 100%;
			}
		}
	</style>
    
     <script>
     /*
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyAENKD4foInKUzPvQEFWzgZQpQSuSpsRTo", v: "beta"});
        
        let map;

        async function initMap() {
          const position = { lat: 35.3556956, lng: -80.8436071 };
          const { Map } = await google.maps.importLibrary("maps");
          const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
          map = new Map(document.getElementById("map"), {
            zoom: 10,
            center: position,
            mapId: "DEMO_MAP_ID",
          });
          const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Junk Raider",
          });
        }

        initMap();*/
        
    </script>
</main>

<?php get_footer(); ?>

<?php wp_footer(); ?>

<?php get_template_part('template_parts/scripts'); ?>

</body>
</html>