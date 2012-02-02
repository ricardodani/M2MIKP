/*
 * M2MIKP - ManyToManyField ImageKit Plugin
 *
 * Author: Ricardo Dani
 * E-mail: ricardodani@gmail.com
 * Github: github.com/ricardodani
 * Twitter: @ricardodani
 * */

(function($) {
    
    function M2MIKP_Init(field_spec) {
        
        // campo M2M
        var field = $('#id_'+field_spec['m2m_field']);
        //TODO: descomentar:
        // $field.hide();
        $('#' + field.attr('id') + ' option[selected=selected]').each(function() {
            alert($(this).text());
        });
        
        
    }
    
    $(document).ready(function() {

        // definição do campo ManyToManyField do tipo imagem que usa
        // ImageSpec do django-imagekit > 1.1
        // TODO: Tranformar em lista.
        var field_spec = {
            'm2m_field': 'imagens',
            'model': 'filmes.Imagem',
            'thumb_spec': 'imagem_logo',
            'original_image': 'imagem_original'
        }
        M2MIKP_Init(field_spec);
    
    })
}(django.jQuery));
