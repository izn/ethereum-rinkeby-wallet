require('./assets/sass/main.scss');

import fontawesome from '@fortawesome/fontawesome'
import {
  faUpload,
  faEnvelope,
  faDollarSign
} from '@fortawesome/fontawesome-free-solid'

import Wallet from './Wallet.js';
import Transaction from './Transaction.js';
import Contract from './Contract.js';

Wallet.init();
Transaction.init();
Contract.init();

fontawesome.library.add(faUpload)
fontawesome.library.add(faEnvelope)
fontawesome.library.add(faDollarSign)
