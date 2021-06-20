$(function () {
    loadData();
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入内容");
                return;
            }
            var data = getData();
            data.push({ title: $(this).val(), done: false });
            saveData(data);
            loadData();
            $(this).val("");
        }
    });

    $("#todolist, #donelist").on("click", "input", function () {

        var dataArr = getData();
        var index = $(this).siblings("a").attr("index");
        dataArr[index].done = $(this).prop("checked");

        saveData(dataArr);
        loadData();
    });
    $("#todolist,#donelist").on("click", "a", function (e) {

        var dataArr = getData();
        // 也可通过对li创建自定义的index属性获得，
        var index = $(this).attr("index");
        dataArr.splice(index, 1);
        saveData(dataArr);
        loadData();

    });
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function loadData() {
        $("ol,ul").empty();//  先清空ol的数据
        var todocount = 0;
        var donecount = 0;
        $.each(getData(), function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' index=" + i + "></a></li>");
                donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' index=" + i + "></a></li>");
                todocount++;
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);

    }
})