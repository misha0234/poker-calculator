import React from 'react';
import {connect} from 'react-redux';
import {addPokerTableCard, addChosenCard, changeSelectedCard} from 'actions/cardActions';
import {addPokerStatistics} from 'actions/optionActions';

import Card from 'components/Card';
import {values, suits} from 'utils/cards';

const CardsBlock = ({chosenCards, selectedCard, addPokerTableCard}) => {
  return <div className="CardsBlock playingCards fourColours inText">
    {suits.map(suit => {
      return <div className="CardsBlock-suit" key={suit}>
        {values.map(value => {
          const cardName = value + suit;
          const isChosen = chosenCards.findIndex(card => card === cardName) > -1;
          return <Card
                   cardName={cardName}
                   cardSuit={suit}
                   cardValue={value}
                   isChosen={isChosen}
                   selectedCard={selectedCard}
                   onClickCard={addPokerTableCard}
                   key={cardName} />;
        })}
      </div>;
    })}
  </div>;
};

const mapStateToProps = (state) => ({
  chosenCards: state.cards.chosenCards
});

const mapDispatchToProps = (dispatch) => ({
  addPokerTableCard(cardName) {
    dispatch(addPokerTableCard(cardName));
    dispatch(addChosenCard(cardName));
    dispatch(changeSelectedCard());
    dispatch(addPokerStatistics(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsBlock);
