<section class="items">
    <div class="content-wrap">
        <div class="items-wrap">
            <div class="section-title">
                <h2><?php echo $items_we_take['title']; ?></h2>
            </div>
            <div class="tabs">
                <ul class="tabs-nav js_tabs-nav">
                    <?php
                    if( have_rows('items_we_take') ):
                        while( have_rows('items_we_take') ): the_row();
                            if( have_rows('tabs') ):
                                while( have_rows('tabs') ): the_row();
                                    $tab_title = get_sub_field('tab_title');
                                    ?>
                                    <li data-tab="#<?php echo $tab_title; ?>"><?php echo $tab_title; ?></li>
                                <?php endwhile; ?>
                            <?php endif; ?>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </ul>
                <div class="tabs-content js_tabs-content">
                    <?php
                    if( have_rows('items_we_take') ):
                        while( have_rows('items_we_take') ): the_row();
                            if( have_rows('tabs') ):
                                while( have_rows('tabs') ): the_row();
                                    $tab_title = get_sub_field('tab_title');
                                    ?>
                                    <div class="tab" id="<?php echo $tab_title; ?>">
                                        <ul class="tab-list">
                                            <?php
                                            if( have_rows('item_name') ):
                                                while( have_rows('item_name') ): the_row();
                                                    $title = get_sub_field('title');
                                                    ?>
                                                    <li><?php echo $title; ?></li>
                                                <?php endwhile; ?>
                                            <?php endif; ?>
                                        </ul>
                                    </div>
                                <?php endwhile; ?>
                            <?php endif; ?>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>