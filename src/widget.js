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
import {markdown} from "@codemirror/lang-markdown";


class lineAnswerWidget extends WidgetType {
  toDOM() {
    let wrap = document.createElement("span");
    wrap.className = "cm-line-decorator";
    let child = document.createElement("span");
    child.className = "cm-line-decorator__icon-wrapper";
    child.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-bot"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>';
    wrap.appendChild(child);
    child = document.createElement("span");
    child.className = "cm-line-decorator__split-line";
    wrap.appendChild(child);
    return wrap;
  }

  ignoreEvent() { return false }
};

class lineTaskWidget extends WidgetType {
  toDOM() {
    let wrap = document.createElement("span");
    wrap.className = "cm-line-decorator";
    let child = document.createElement("span");
    child.className = "cm-line-decorator__icon-wrapper";
    child.innerHTML = '<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><path d="M13.1318 11.3125L12.7388 10.7333L12.7388 10.7333L13.1318 11.3125ZM16.8555 21C16.8555 21.3866 17.1689 21.7 17.5555 21.7C17.9421 21.7 18.2555 21.3866 18.2555 21H16.8555ZM4.98688 10.3431L4.31382 10.5354L4.31382 10.5354L4.98688 10.3431ZM4.44847 8.45868L3.77541 8.65098L3.77541 8.65098L4.44847 8.45868ZM2.33917 9.0235L3.01827 8.85373L3.01827 8.85372L2.33917 9.0235ZM3.89881 15.262L4.57791 15.0923L4.57791 15.0923L3.89881 15.262ZM5.55553 17.2556C5.94213 17.2556 6.25553 16.9422 6.25553 16.5556C6.25553 16.169 5.94213 15.8556 5.55553 15.8556V17.2556ZM13.7445 21C13.7445 21.3866 14.0579 21.7 14.4445 21.7C14.8311 21.7 15.1445 21.3866 15.1445 21H13.7445ZM15.1445 18.3333C15.1445 17.9467 14.8311 17.6333 14.4445 17.6333C14.0579 17.6333 13.7445 17.9467 13.7445 18.3333H15.1445ZM21.1213 6.70711L20.6263 7.20208L21.1213 6.70711ZM21.1213 10.9497L20.6263 10.4548L20.6263 10.4548L21.1213 10.9497ZM20.2333 5.34004C19.8688 5.21116 19.4689 5.40217 19.34 5.76665C19.2111 6.13114 19.4022 6.53109 19.7666 6.65996L20.2333 5.34004ZM19.7666 10.9969C19.4022 11.1258 19.2111 11.5257 19.34 11.8902C19.4689 12.2547 19.8688 12.4457 20.2333 12.3168L19.7666 10.9969ZM18.0858 7.32843L18.5808 6.83346L18.5808 6.83346L18.0858 7.32843ZM18.0858 10.3284L18.5808 10.8234L18.5808 10.8234L18.0858 10.3284ZM17.5262 6.16847C17.1618 6.03959 16.7618 6.2306 16.6329 6.59508C16.5041 6.95957 16.6951 7.35952 17.0595 7.48839L17.5262 6.16847ZM17.0595 10.1685C16.6951 10.2973 16.5041 10.6973 16.6329 11.0618C16.7618 11.4263 17.1618 11.6173 17.5262 11.4884L17.0595 10.1685ZM10.889 11.3C9.06642 11.3 7.58896 9.82255 7.58896 8.00001H6.18896C6.18896 10.5958 8.29322 12.7 10.889 12.7V11.3ZM7.58896 8.00001C7.58896 6.17746 9.06642 4.7 10.889 4.7V3.3C8.29322 3.3 6.18896 5.40427 6.18896 8.00001H7.58896ZM10.889 4.7C12.7115 4.7 14.189 6.17746 14.189 8.00001H15.589C15.589 5.40427 13.4847 3.3 10.889 3.3V4.7ZM14.189 8.00001C14.189 9.13616 13.6154 10.1386 12.7388 10.7333L13.5248 11.8918C14.769 11.0477 15.589 9.61973 15.589 8.00001H14.189ZM12.7388 10.7333C12.2115 11.091 11.5757 11.3 10.889 11.3V12.7C11.8647 12.7 12.7728 12.4019 13.5248 11.8918L12.7388 10.7333ZM18.2555 21V18.7778H16.8555V21H18.2555ZM12.6666 13.1889H9.68766V14.5889H12.6666V13.1889ZM5.65995 10.1508L5.12154 8.26637L3.77541 8.65098L4.31382 10.5354L5.65995 10.1508ZM1.66007 9.19328L3.21971 15.4318L4.57791 15.0923L3.01827 8.85373L1.66007 9.19328ZM3.21971 15.4318C3.48767 16.5037 4.45071 17.2556 5.55553 17.2556V15.8556C5.09312 15.8556 4.69006 15.5409 4.57791 15.0923L3.21971 15.4318ZM3.39853 6.9667C2.23273 6.9667 1.37732 8.06229 1.66007 9.19328L3.01827 8.85372C2.95643 8.60634 3.14353 8.3667 3.39853 8.3667V6.9667ZM5.12154 8.26637C4.90174 7.49708 4.1986 6.9667 3.39853 6.9667V8.3667C3.57353 8.3667 3.72733 8.48271 3.77541 8.65098L5.12154 8.26637ZM9.68766 13.1889C7.81741 13.1889 6.17375 11.9491 5.65995 10.1508L4.31382 10.5354C4.99934 12.9347 7.19234 14.5889 9.68766 14.5889V13.1889ZM18.2555 18.7778C18.2555 15.6911 15.7533 13.1889 12.6666 13.1889V14.5889C14.9801 14.5889 16.8555 16.4643 16.8555 18.7778H18.2555ZM15.1445 21V18.3333H13.7445V21H15.1445ZM20.6263 7.20208C21.0577 7.63342 21.3 8.21843 21.3 8.82843H22.7C22.7 7.84713 22.3102 6.90602 21.6163 6.21213L20.6263 7.20208ZM21.3 8.82843C21.3 9.43843 21.0577 10.0234 20.6263 10.4548L21.6163 11.4447C22.3102 10.7508 22.7 9.80973 22.7 8.82843H21.3ZM19.7666 6.65996C20.0871 6.77326 20.3815 6.95721 20.6263 7.20208L21.6163 6.21213C21.2223 5.8182 20.7487 5.52226 20.2333 5.34004L19.7666 6.65996ZM20.6263 10.4548C20.3815 10.6996 20.0871 10.8836 19.7666 10.9969L20.2333 12.3168C20.7487 12.1346 21.2223 11.8387 21.6163 11.4447L20.6263 10.4548ZM17.5908 7.82341C17.8574 8.08995 18.0071 8.45147 18.0071 8.82843H19.4071C19.4071 8.08017 19.1099 7.36256 18.5808 6.83346L17.5908 7.82341ZM18.0071 8.82843C18.0071 9.20539 17.8574 9.56691 17.5908 9.83345L18.5808 10.8234C19.1099 10.2943 19.4071 9.57669 19.4071 8.82843H18.0071ZM17.0595 7.48839C17.2576 7.55841 17.4395 7.67209 17.5908 7.82341L18.5808 6.83346C18.2804 6.53307 17.9192 6.30741 17.5262 6.16847L17.0595 7.48839ZM17.5908 9.83345C17.4395 9.98477 17.2576 10.0984 17.0595 10.1685L17.5262 11.4884C17.9192 11.3495 18.2804 11.1238 18.5808 10.8234L17.5908 9.83345Z"/></svg>';
    wrap.appendChild(child);
    child = document.createElement("span");
    child.className = "cm-line-decorator__split-line";
    wrap.appendChild(child);
    return wrap;
  }

  ignoreEvent() { return false }
};
class lineEndWidget extends WidgetType {
  toDOM() {
    let wrap = document.createElement("span");
    wrap.className = "cm-line-decorator";
    let child = document.createElement("span");
    child.className = "cm-line-decorator__split-line-end";
    wrap.appendChild(child);
    return wrap;
  }

  ignoreEvent() { return false }
};

const lineTaskMatcher = new MatchDecorator({
  regexp: /==1/g,
  decoration: match => Decoration.replace({
    widget: new lineTaskWidget(match[1]),
  })
});

const lineAnswerMatcher = new MatchDecorator({
  regexp: /==2/g,
  decoration: match => Decoration.replace({
    widget: new lineAnswerWidget(match[1]),
  })
});
const lineEndMatcher = new MatchDecorator({
  regexp: /===/g,
  decoration: match => Decoration.replace({
    widget: new lineEndWidget(match[1]),
  })
});

const lineTaskDecoratorPlugin = ViewPlugin.fromClass(class {
    lines
    constructor(view) {
      this.lines = lineTaskMatcher.createDeco(view)
    }
    update(update) {
      this.lines = lineTaskMatcher.updateDeco(update, this.lines)
    }
  }, {
    decorations: instance => instance.lines,
    provide: plugin => EditorView.atomicRanges.of(view => {
      return view.plugin(plugin)?.lines || Decoration.none
    })
});

const lineAnswerDecoratorPlugin = ViewPlugin.fromClass(class {
    lines
    constructor(view) {
      this.lines = lineAnswerMatcher.createDeco(view)
    }
    update(update) {
      this.lines = lineAnswerMatcher.updateDeco(update, this.lines)
    }
  }, {
    decorations: instance => instance.lines,
    provide: plugin => EditorView.atomicRanges.of(view => {
      return view.plugin(plugin)?.lines || Decoration.none
    })
});

const lineEndDecoratorPlugin = ViewPlugin.fromClass(class {
    lines
    constructor(view) {
      this.lines = lineEndMatcher.createDeco(view)
    }
    update(update) {
      this.lines = lineEndMatcher.updateDeco(update, this.lines)
    }
  }, {
    decorations: instance => instance.lines,
    provide: plugin => EditorView.atomicRanges.of(view => {
      return view.plugin(plugin)?.lines || Decoration.none
    })
});

export function setupEditor(selector) {
  let startState = EditorState.create({
    // doc: "==1\nприведи текст к верхнему регистру\n==2\nPELL\n===",
    extensions: [basicSetup, EditorView.lineWrapping, markdown(), lineTaskDecoratorPlugin, lineAnswerDecoratorPlugin, lineEndDecoratorPlugin]
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
