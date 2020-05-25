import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html: HTMLElement) => {
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
