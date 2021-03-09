import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';

class FileReviewer extends Component {
  render() {
    const {extension, file} = this.props;

    return (
      <FileViewer
        fileType={extension}
        filePath={file}
        errorComponent={<></>}
        onError={this.onError}/>
    );
  }

  onError(e) {
    console.log('error in file-viewer\n' + e);
  }
}

export default FileReviewer;