export default class Note {
  constructor({ id, title, content, category = 'Pribadi', date = null }) {
    this.id = id || Date.now();
    this.title = title;
    this.content = content;
    this.category = category;
    this.date = date || new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  preview(maxLength = 100) {
    return this.content.length > maxLength ? `${this.content.slice(0, maxLength)}...` : this.content;
  }
}
