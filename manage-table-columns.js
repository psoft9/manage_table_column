/**********************************
 * Create Button onclick function
 * <button type="button" onclick="openManageColumns(tableID)">Manage Columns</button>
 */
// TABLE COLUMN MANAGE
//============================
$(document).ready(function(){
    const style = `<style id="pr-manage-columns" type="text/css">
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
        .manage-columns .column-list label{font-size: 16px; position: relative; padding: 5px; display: block; user-select: none;}
        .manage-columns .column-list label input{display: none;}
        .manage-columns .column-list label b::before {
            font-weight: 700;
            display: inline-block;
            margin-right: 10px;
            line-height: 1;
        }
        .manage-columns .column-list label input:checked + b::before {
            content: '\\2713';
            color: #00cf00;
        }
        .manage-columns .column-list label input:not(:checked) + b::before {
            content: '\\10102';
            color: #cf0000;
            margin-right: 14px;
        }
    </style>`;
    $('head').append(style);
    $('table').each(function(){
        const id = '#'+this.id;
        let columnList = window.localStorage.getItem(id) || '[]';
        let colArr = JSON.parse(columnList);

        console.log(id, colArr);
        // const isChecked = !colArr.includes(index);
        for(let i=0; i<colArr.length; i++){
            $(id).find('tr th:nth-child('+(colArr[i]+1)+')').hide();
            $(id).find('tr td:nth-child('+(colArr[i]+1)+')').hide();
        }
    })
});

function openManageColumns(s){
    if($('.manage-columns.in').length > 0){
        $('.manage-columns').removeClass('in');
        setTimeout(() => {
            $('.manage-columns').remove();
            $(document).off('click'); // Remove the event handler to prevent memory leaks
        }, 350);
    }else{
        let columnList = window.localStorage.getItem(s) || '[]';
        let colArr = JSON.parse(columnList);
        $('.manage-columns').remove();
        $('body').prepend('<div class="manage-columns"><h3>Manage Table Header</h3><ul class="column-list"></ul></div>');
        let index = 0;
        $(s).find('thead tr:first-child th').each(function(){
            const isFixed = $(this).hasClass('fix');
            const isChecked = !colArr.includes(index);
            const li = `<li `+(isFixed && 'disabled')+`><label><input type="checkbox" name="columns" value="`+index+`" onchange="prModifyTable(this, `+index+`, '`+s+`')" ${isChecked ? 'checked' : ''} /><b></b>`+ this.innerText +`</label></li>`;
            $('.manage-columns .column-list').append(li);
            index++;
        });

        // Detect click outside of the .manage-columns element
        $(document).on('click', function(event) {
            // alert($('.manage-columns').hasClass('in'))
            if (!$(event.target).closest('.manage-columns').length && $('.manage-columns').hasClass('in')) {
                $('.manage-columns').removeClass('in');
                setTimeout(() => {
                    $('.manage-columns').remove();
                    $(document).off('click'); // Remove the event handler to prevent memory leaks
                }, 350);
            }
        });

        setTimeout(() => {
            $('.manage-columns').addClass('in');
        }, 100);
    }
}

function prModifyTable(d,i,s){
    let columnList = window.localStorage.getItem(s) || '[]';
    let colArr = JSON.parse(columnList);

    if(!d.checked){
        $(s).find('tr th:nth-child('+(i+1)+')').hide();
        $(s).find('tr td:nth-child('+(i+1)+')').hide();
        colArr.push(i);
    }else{
        $(s).find('tr th:nth-child('+(i+1)+')').show();
        $(s).find('tr td:nth-child('+(i+1)+')').show();
        colArr = colArr.filter(colIndex => colIndex !== i);
    }

    window.localStorage.setItem(s, JSON.stringify(colArr));
}