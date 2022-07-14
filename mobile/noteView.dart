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
          iconTheme: IconThemeData(color: Colors.white, opacity: 1, size: 40),
          title: Text('View Note'),
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
          key: _drawerscaffoldkey,
          drawer: NavBar(),
        ));
  }
}
