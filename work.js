nw.App.clearCache();

var isShowWindow = true;

var isShowDone = false;

var showMiutes=45;

var win = nw.Window.get();

var contextMenu = new nw.Menu();

// Add some items
contextMenu.append(new nw.MenuItem({ label: '休息！休息一会',click:function(){isShowWindow = false;win.hide()} }));

function show()
{
	var myDate = new Date();
	var miutes=myDate.getMinutes();
	
	if(showMiutes == miutes  && !isShowDone)
	{
			win.show();
			isShowDone=true;			
	}
	else if(showMiutes != miutes)
	{
			isShowDone=false;
	}
	
	console.log(isShowDone);
}

/*tray*/


var tray = new nw.Tray({ title: '休息！休息一会', icon: 'tray.png' });

tray.tooltip="休息！休息一会";

// Give it a menu
var menu = new nw.Menu();
menu.append(new nw.MenuItem({ type: 'normal', label: '退出' ,click:function(){isShowWindow = false;nw.App.quit()}}));
tray.menu = menu;




 //tray的click事件：左键最小化

tray.on('click',
            function()
            {
                if(isShowWindow)
                {
					console.log("hide");
                    win.hide();
                    isShowWindow = false;
                }
                else
                {
					console.log("show");
                    win.show();
					win.setAlwaysOnTop(true);
                    isShowWindow = true;
                }
            }
);


	document.body.addEventListener('contextmenu', function (ev) {

				ev.preventDefault();
				
				var x = ev.clientX ,y = ev.clientY ;

				contextMenu.popup(x, y);

				return false;

			});
			


	setInterval('show()',3000);




