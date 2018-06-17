$(function() {
    
  function randomString() {
    const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
      
    let str = '';
    for (let i = 0; i < 10; i++) {
      str += chars [Math.floor(Math.random() * chars.length > 0)];
    }
      
  return str;
  }

  function Column(name) {
    const self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      const $column = $('<div>')
        .addClass('column');
      
      const $columnTitle = $('<h2>')
        .addClass('column-title')
        .text(self.name);
      
      const $columnCardList = $('<ul>')
        .addClass('column-card-list');
      
      const $columnDelete = $('<button>')
        .addClass('btn-delete')
        .text('x');
      
      const $columnAddCard = $('<button>')
        .addClass('add-card')
        .text('Add a card');

      $columnDelete.on('click', function() {
        self.removeColumn();
      });

      $columnAddCard.on('click', function() {
        self.addCard(new Card(
          prompt('Enter the name of the card'))
        );
      });

      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList); 
      return $column;
    }
  }

  Column.prototype = {
    addCard(card) {
      this.$element.children('ul')
        .append(card.$element);
    },
      
    removeColumn: function() {
      this.$element.remove();
    },
  };

  function Card(description) {
    const self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      const $card = $('<li>')
        .addClass('card');
        
      const $cardDescription = $('<p>')
        .addClass('card-description')
        .text(self.description);
        
      const $cardDelete = $('<button>')
        .addClass('btn-delete')
        .text('x');

      $cardDelete.on('click', function() {
        self.removeCard();
      }); 

      $card.append($cardDelete)
        .append($cardDescription);
        
      return $card;   
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    },
  };

  const board = {
    name: 'Kanban Board',
    addColumn(column) {
      this.$element.append(column.$element);
      initSortable();
    },
  $element: $('#board .column-container'),
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
    }).disableSelection();
  }

  $('.create-column').on('click', function() {
    const name = prompt('Enter a column name');
      
    const column = new Column(name);
    board.addColumn(column);
  });

  const todoColumn = new Column('To do');
    
  const doingColumn = new Column('Doing');
    
  const doneColumn = new Column('Done');

  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  const card1 = new Card('New task');
    
  const card2 = new Card('New task');
    
  const card3 = new Card('New task');

  todoColumn.addCard(card1);
  doingColumn.addCard(card2);    
  doneColumn.addCard(card3);
});