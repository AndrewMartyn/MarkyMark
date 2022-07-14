import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import {
    UncontrolledTreeEnvironment,
    Tree,
    StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style.css";

export default function FileSystemNavigator() {
    // return (
    //     <TreeView
    //         aria-label="file system navigator"
    //         defaultCollapseIcon={<ExpandMoreIcon />}
    //         defaultExpandIcon={<ChevronRightIcon />}
    //         sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    //         className="scroll"
    //     >
    //         <TreeItem nodeId="1" label="Applications">
    //             <TreeItem nodeId="2" label="Calendar" />
    //         </TreeItem>
    //         <TreeItem nodeId="5" label="Documents">
    //             <TreeItem nodeId="10" label="OSS" />
    //             <TreeItem nodeId="6" label="MUI">
    //                 <TreeItem nodeId="8" label="index.js" />
    //             </TreeItem>
    //         </TreeItem>
    //     </TreeView>
    // );
    var items = {
        root: {
            index: "root",
            hasChildren: true,
            children: ["child1", "child2", "child4"],
            data: "Root item",
        },
        child1: {
            index: "child1",
            children: [],
            data: "Child item 1",
        },
        child2: {
            index: "child2",
            hasChildren: true,
            children: ["child3"],
            data: "Child item 2",
        },
        child3: {
            index: "child3",
            children: [],
            data: "Child item 3",
        },
    };

    var newItem = {
        child4: {
            index: "child4",
            hasChildren: true,
            children: ["child6"],
            data: "Child item 4",
        },
    };
    items = { ...items, ...newItem };

    console.log(JSON.stringify(items));
    return (
        <UncontrolledTreeEnvironment
            dataProvider={
                new StaticTreeDataProvider(items, (item, data) => ({
                    ...item,
                    data,
                }))
            }
            getItemTitle={(item) => item.data}
            viewState={{}}
        >
            <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
        </UncontrolledTreeEnvironment>
    );
}
