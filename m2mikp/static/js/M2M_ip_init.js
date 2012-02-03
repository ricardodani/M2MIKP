/*
 * M2MIKP - ManyToManyField ImageKit Plugin
 *
 * Author: Ricardo Dani
 * E-mail: ricardodani@gmail.com
 * Github: github.com/ricardodani
 * Twitter: @ricardodani
 * */

(function($) {
    
    function M2MIKP_Base(parent_field) {
        if ($('#m2mikp_base').length == 0) {
            $.ajax({
                url: "/m2mikp/base/",
                success: function(data){
                    parent_field.append(data);
                }
            });
        }
    }

    function M2MIKP_Populate(options, field_spec) {
        
        var get_params = "?model=" + field_spec['model'];
        get_params = get_params + '&thumb_spec='+field_spec['thumb_spec'];
        get_params = get_params + '&original_image='+field_spec['original_image'];
        get_params = get_params + '&ids=';

        get_params = get_params + options;
        
        $.ajax({
            url: "/m2mikp/get_thumbs/" + get_params,
            success: function(data){
                $('#m2mikp_base').html('');
                $('#m2mikp_base').append(data);
            }
        });
    }
    
    function M2MIKP_Init(field_spec, field) {
        
        // campo M2M
        var parent_field = field.parent();
        var options = field.attr('value');

        // TODO: descomentar:
        // field.hide();
        
        M2MIKP_Base(parent_field);

        M2MIKP_Populate(options, field_spec);
        
    }
    
    $(document).ready(function() {

        // definição do campo ManyToManyField do tipo imagem que usa
        // ImageSpec do django-imagekit > 1.1
        // TODO: Tranformar em lista.
        var field_spec = {
            'm2m_field': 'imagens',
            'model': 'filmes.Imagem',
            'thumb_spec': 'imagem_listagem',
            'original_image': 'imagem_original'
        }
        
        var field = $('#id_'+field_spec['m2m_field']);
        
        field.live('change', function() {
            M2MIKP_Init(field_spec, field);
        }).change();
        field.live('focusin', function() {
            field.change();
        });
    
    })
}(django.jQuery));
