import { savePDF } from '@progress/kendo-react-pdf';
import canvg from 'canvg';

class DocService {
  createPdf = (html) => {
    savePDF(html, {
      author: 'Junha Park'
    , creator: 'Junha Park'
    , paperSize: 'Letter'
    , fileName: 'resume.pdf'
    , scale: 0.75     //  Hard coded
    , margin: 0
    })
  }
}

const Doc = new DocService();
export default Doc;
