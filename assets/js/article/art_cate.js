$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章分类失败！')
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('新增分类失败！')
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // if (res.status !== 0) return layer.msg('修改文章分类失败！')
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) { return layer.msg('修改文章分类失败！') }
                layer.msg('修改文章分类成功~')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) { return layer.msg('删除文章分类失败！') }
                    layer.msg('删除文章分类成功~')
                    layer.close(index);
                    initArtCateList()
                }
            })


        });
    })
})