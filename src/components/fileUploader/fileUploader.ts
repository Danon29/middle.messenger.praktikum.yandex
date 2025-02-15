import Block from '../../core/block.ts'
import template from './template.hbs?raw'

interface FileUploaderProps {
  onFileSelect: (file: File) => void
}

export default class FileUploader extends Block {
  private fileInput: HTMLInputElement | null = null

  constructor(props: FileUploaderProps) {
    super('div', {
      ...props,
      className: 'file-uploader',
      selectedFileName: '', // Имя загруженного файла
      events: {
        click: () => this.selectFile()
      }
    })
  }

  selectFile() {
    if (!this.fileInput) {
      this.fileInput = document.createElement('input')
      this.fileInput.type = 'file'
      this.fileInput.style.display = 'none'
      this.fileInput.addEventListener('change', (event) => this.handleFileSelect(event))
      document.body.appendChild(this.fileInput)
    }
    this.fileInput.click()
  }

  handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      this.setProps({ selectedFileName: file.name })
      this.props.onFileSelect(file)
    }
  }

  render(): Node | string {
    return this.compile(template as string, this.props)
  }
}
