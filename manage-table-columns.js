function openManageColumns(e){if($(".manage-columns.in").length>0)$(".manage-columns").removeClass("in"),setTimeout(()=>{$(".manage-columns").remove(),$(document).off("click")},350);else{let n=JSON.parse(window.localStorage.getItem(e)||"[]");$(".manage-columns").remove(),$("body").prepend('<div class="manage-columns"><h3>Manage Table Header</h3><ul class="column-list"></ul></div>');let t=0;$(e).find("thead tr:first-child th").each(function(){let a=$(this).hasClass("fix"),l=!n.includes(t),i="<li "+(a&&"disabled")+'><label><input type="checkbox" name="columns" value="'+t+'" onchange="prModifyTable(this, '+t+", '"+e+`')" ${l?"checked":""} />`+this.innerText+"</label></li>";$(".manage-columns .column-list").append(i),t++}),$(document).on("click",function(e){!$(e.target).closest(".manage-columns").length&&$(".manage-columns").hasClass("in")&&($(".manage-columns").removeClass("in"),setTimeout(()=>{$(".manage-columns").remove(),$(document).off("click")},350))}),setTimeout(()=>{$(".manage-columns").addClass("in")},100)}}function prModifyTable(e,n,t){let a=JSON.parse(window.localStorage.getItem(t)||"[]");e.checked?($(t).find("tr th:nth-child("+(n+1)+")").show(),$(t).find("tr td:nth-child("+(n+1)+")").show(),a=a.filter(e=>e!==n)):($(t).find("tr th:nth-child("+(n+1)+")").hide(),$(t).find("tr td:nth-child("+(n+1)+")").hide(),a.push(n)),window.localStorage.setItem(t,JSON.stringify(a))}$(document).ready(function(){let e=`<style id="pr-manage-columns" type="text/css">
    .manage-columns {
        position: fixed;
        z-index: 2000;
        background: #fff;
        padding: 15px;
        width: 280px;
        height: 100vh;
        top: 0;
        transition: all 0.3s;
        bottom: 0;
        overflow: auto;
        right: -280px;
        box-shadow: 0px 0px 20px #3333;
    }
    .manage-columns.in {right:0}
    .manage-columns .column-list{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .manage-columns h3 {
        font-size: 20px;
        text-align: center;
        padding: 5px;
        border-bottom: 2px solid;
    }
    .manage-columns [disabled]{pointer-events: none; opacity: 0.6;}
</style>`;$("head").append(e),$("table").each(function(){let e="#"+this.id,n=JSON.parse(window.localStorage.getItem(e)||"[]");console.log(e,n);for(let t=0;t<n.length;t++)$(e).find("tr th:nth-child("+(n[t]+1)+")").hide(),$(e).find("tr td:nth-child("+(n[t]+1)+")").hide()})});