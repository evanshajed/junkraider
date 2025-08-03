<div class="modal" id="quoteModal">
    <div class="modal-inner form-container" style="max-width: 384px">
        <a href="" class="js_close-modal close-btn">
            <img src="<?php echo get_template_directory_uri() . '/img/svg/close.svg'; ?>" alt="">
        </a>
		<div class="loader js_loader">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="modal-result">
            <?php
			
                if ( function_exists( 'wpcf7_enqueue_scripts' ) ) {
                    wpcf7_enqueue_scripts();
                }
                    
                if ( function_exists( 'wpcf7_enqueue_styles' ) ) {
                    wpcf7_enqueue_styles();
                }
                
                echo do_shortcode('[contact-form-7 id="e985176" title="Instant Quote Form"]');
                
            ?>
        </div>
    </div>
</div>
<div class="quote-fab" onclick="$('#quoteModal').addClass('active')">
    <img src="<?php echo get_template_directory_uri() . '/img/svg/truck.svg'; ?>" alt="">
    <span>Instant Quote</span>
</div>
<style>
.quote-fab {
    gap: 14px;
    position: fixed;
    left: 16px;
    bottom: 16px;
    height: 60px;
    display: flex;
    overflow: hidden;
    max-width: 300px; /* 72px; */
    align-items: center;
    padding: 14px 20px;
    border-radius: 30px;
    border: 1px solid rgba(43, 85, 152, 0.20);
    background: #FFF;
    box-shadow: 0px 20px 26px -16px rgba(43, 85, 152, 0.60);
    transition: all .2s ease;
    cursor: pointer;
    user-select: none;
    z-index: 98;
    -webkit-animation: btnWiggle 5s infinite;
    -moz-animation: btnWiggle 5s infinite;
    -o-animation: btnWiggle 5s infinite;
    animation: btnWiggle 5s infinite;
}
.quote-fab:hover {
    max-width: 300px;
    box-shadow: 0px 40px 26px -16px rgba(43, 85, 152, 0.60);
}
.quote-fab:active {
    background: #EEE;
}
.quote-fab img {
    width: 32px;
    height: 32px;
}
.quote-fab span {
    white-space: nowrap;
    overflow: hidden;
}

#quoteModal input {
    border: 2px solid #D4E3C7;
    box-sizing: border-box;
    height: 44px;
    border-radius: 22px;
    line-height: 40px;
    padding: 0 20px;
    font-size: 16px;
    width: 100%;
    outline: none;
}

#quoteModal input:active, #quoteModal input:focus {
    border: 2px solid #72A53B;
}

#quoteModal input::placeholder {
    color: #cccccc;
}
 
#quoteModal .wpcf7-not-valid-tip {
    padding-left: 22px;
    padding-top: 4px;
    font-size: 12px;
}
 
#quoteModal .wpcf7-response-output {
    margin: 20px 0 0 0 !important;
    padding: 14px 20px !important;
    border-radius: 22px;
    font-size: 16px;
    line-height: 24px;
    border: 2px solid #dc3232 !important;
    background: #ffd6d6;
    color: #dc3232;
}

#quoteModal form.sent .wpcf7-response-output {
    border: 2px solid #72A53B !important;
    background: #F1F6EC;
    color: #72A53B;
}

#quoteModal .wpcf7-form-control-wrap {
    display: block;
    margin-bottom: 20px;
}

#quoteModal br {
    display: none;
}

#quoteModal .custom-btn {
    width: 100%;
}

#quoteModal p {
    margin: 0;
    font-size: 16px;
    line-height: 24px;
}

#quoteModal .modal-result {
    padding: 20px;
}

#quoteModal h2 {
    margin: 0 0 15px 0;
    font-size: 24px;
}

#quoteModal .p {
    margin: 0 0 20px 0;
}

@-webkit-keyframes btnWiggle {
	0% {-webkit-transform: rotate(0deg);}
	2% {-webkit-transform: rotate(-5deg);}
	3.5% {-webkit-transform: rotate(5deg);}
	5% {-webkit-transform: rotate(0deg);}
	100% {-webkit-transform: rotate(0deg);}
}
@-o-keyframes btnWiggle {
	0% {-webkit-transform: rotate(0deg);}
	2% {-webkit-transform: rotate(-5deg);}
	3.5% {-webkit-transform: rotate(5deg);}
	5% {-webkit-transform: rotate(0deg);}
	100% {-webkit-transform: rotate(0deg);}
}
@keyframes btnWiggle {
	0% {-webkit-transform: rotate(0deg);}
	2% {-webkit-transform: rotate(-3deg);}
	3.5% {-webkit-transform: rotate(3deg);}
	5% {-webkit-transform: rotate(0deg);}
	7% {-webkit-transform: rotate(-5deg);}
	8.5% {-webkit-transform: rotate(5deg);}
	10% {-webkit-transform: rotate(0deg);}
	12% {-webkit-transform: rotate(-5deg);}
	13.5% {-webkit-transform: rotate(5deg);}
	15% {-webkit-transform: rotate(0deg);}
	17% {-webkit-transform: rotate(-5deg);}
	18.5% {-webkit-transform: rotate(5deg);}
	20% {-webkit-transform: rotate(0deg);}
	22% {-webkit-transform: rotate(-5deg);}
	23.5% {-webkit-transform: rotate(5deg);}
	25% {-webkit-transform: rotate(0deg);}
	27% {-webkit-transform: rotate(-3deg);}
	28.5% {-webkit-transform: rotate(3deg);}
	30% {-webkit-transform: rotate(0deg);}
	100% {-webkit-transform: rotate(0deg);}
}

</style>
