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
    let wrap = document.createElement("div");
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
    doc: "==\nHello World\n==\n123\n==",
    extensions: [basicSetup, linePlugin]
  });

  let view = new EditorView({
    state: startState,
    parent: document.querySelector(selector)
  });

}