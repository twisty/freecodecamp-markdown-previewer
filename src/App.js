import React, { Component } from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markdown: props.markdown
        };
        this.editorTextarea = null;
    }

    componentDidMount() {
        this.editorTextarea.focus();
    }

    handleChange = (e) => {
        this.setState({markdown: e.target.value});
    }

    transformMarkdown = (markdown) => {
        return remark().use(reactRenderer).process(this.state.markdown).contents;
    }

    render() {
        return (
            <div className="d-flex align-items-stretch h-100">
                <div id="editor" className="w-50">
                    <label htmlFor="editor-textarea" className="sr-only">Markdown</label>
                    <textarea
                        id="editor-textarea"
                        placeholder="# Markdown"
                        className="form-control markdown h-100"
                        onChange={this.handleChange}
                        value={this.state.markdown}
                        ref={(node) => this.editorTextarea = node}
                    />
                </div>
                <div id="preview" className="w-50 p-4">
                    {this.transformMarkdown(this.state.markdown)}
                </div>
            </div>
        );
    }
}

App.defaultProps = {
    markdown: '# Markdown Editor'
}

export default App;
