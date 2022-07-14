import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'NavBar.dart';

class noteView extends StatefulWidget {
  @override
  _NoteViewState createState() => _NoteViewState();
}

class _NoteViewState extends State<noteView> {
  final GlobalKey<ScaffoldState> _drawerscaffoldkey =
      new GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          iconTheme:
              IconThemeData(color: Color(0xFF6CA8F1), opacity: 1, size: 40),
          title: Text('View Note', style: TextStyle(color: Colors.white)),
          backgroundColor: Color(0xFF212121),
          leading: IconButton(
            icon: Icon(Icons.toc_rounded),
            onPressed: () {
              if (_drawerscaffoldkey.currentState!.isDrawerOpen) {
                Navigator.pop(context);
              } else {
                _drawerscaffoldkey.currentState!.openDrawer();
              }
            },
          ),
        ),
        body: Scaffold(
          backgroundColor: Color(0xFF424242),
          key: _drawerscaffoldkey,
          drawer: NavBar(),
        ));
  }
}
