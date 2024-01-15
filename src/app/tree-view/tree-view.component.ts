import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {  GetUsers } from '../actions/app.action';
import { Appstate } from '../states/app.state';
import { take } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/core';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';


interface TreeNode {
  name: string;
  key: string;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  key: string;
  level: number;
}


@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewComponent implements OnInit {


  private transformer = (node: TreeNode, level: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.key === node.key
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level,
            key: node.key,
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData: TreeNode[] = []; // Initialize an empty array for the employee data
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  selectListSelection = new SelectionModel<FlatNode>(true);

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  employees: any[] = [];

  @Select(Appstate.selectStateData) employees$!: Observable<any>;

  constructor(private http:HttpClient, private store:Store) {}

  ngOnInit() {
    this.store.dispatch(new GetUsers());

    // Retrieve data only once using selectOnce
    this.employees$.pipe(take(1)).subscribe((returnData) => {
      this.employees = returnData;
      console.log("employees", this.employees)

      // Process the employees data to construct the tree structure
      this.constructTree();
    });
  }

  constructTree() {
    // Create a dictionary to store nodes using their ids as keys
    const nodeDictionary: { [key: string]: TreeNode } = {};

    // Create the root nodes and add all nodes to the dictionary
    for (const emp of this.employees) {
      const id = emp.id + '';
      const parentId = emp.parentId;
      const node: TreeNode = { ...emp, key: id, children: [] };
      nodeDictionary[id] = node;

      if (!parentId) {
        this.treeData.push(node); // If parentId is null, it's a root node
      }
    }

    // Connect child nodes to their parent nodes
    for (const emp of this.employees) {
      const id = emp.id + '';
      const parentId = emp.parentId;

      if (parentId) {
        const parentNode = nodeDictionary[parentId];
        if (parentNode) {
          // Use the nullish coalescing operator to ensure `parentNode.children` is not undefined
          parentNode.children = parentNode.children ?? [];
          parentNode.children.push(nodeDictionary[id]);
        }
      }
    }
    console.log("treeData", this.treeData)
    // Set the treeData in the dataSource and expand all nodes
    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }


  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
  hasNoContent = (_: number, node: FlatNode): boolean => node.name === '';
  trackBy = (_: number, node: FlatNode): string => `${node.key}-${node.name}`;

}
