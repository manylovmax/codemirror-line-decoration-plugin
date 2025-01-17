// import {EditorView, basicSetup} from "codemirror";
// export function setup(selector) {
//   let editor = new EditorView({
//     extensions: [basicSetup],
//     parent: document.querySelector(selector)
//   })
// }

import {EditorState} from "@codemirror/state"
import {EditorView, MatchDecorator, WidgetType, Decoration, ViewPlugin} from "@codemirror/view"
import {basicSetup} from "codemirror";


class lineWidget extends WidgetType {
  toDOM() {
    let wrap = document.createElement("span");
    wrap.className = "cm-line-decorator";
    return wrap;
  }

  ignoreEvent() { return false }
};

const lineMatcher = new MatchDecorator({
  regexp: /==/g,
  decoration: match => Decoration.replace({
    widget: new lineWidget(match[1]),
  })
});

const linePlugin = ViewPlugin.fromClass(class {
    lines
    constructor(view) {
      this.lines = lineMatcher.createDeco(view)
    }
    update(update) {
      this.lines = lineMatcher.updateDeco(update, this.lines)
    }
  }, {
    decorations: instance => instance.lines,
    provide: plugin => EditorView.atomicRanges.of(view => {
      return view.plugin(plugin)?.lines || Decoration.none
    })
});

export function setupEditor(selector) {
  let startState = EditorState.create({
    // doc: "==\nHello World\n==\n123\n==",
    extensions: [basicSetup, linePlugin]
  });

  let editorView = new EditorView({
    state: startState,
    parent: document.querySelector(selector)
  });

  return editorView;
}

export function getEditorValue(editorView) {
  return editorView.state.doc.toString();
}

export function setEditorValue(editorView, newValue) {
  let transaction = editorView.state.update({changes: {from: 0, to: editorView.state.doc.length, insert: newValue}});
  editorView.dispatch(transaction);
}

export function getEditorSelection(editorView) {
  return editorView.state.sliceDoc(editorView.state.selection.main.from, editorView.state.selection.main.to);
}

export function getEditorCursorPosition(editorView) {
  return editorView.state.selection.main.head;
}
