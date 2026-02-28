export interface Auction {
  id: string;
  itemName: string;
  currentBid: number;
  timeRemaining: string;
  image: string;
  bids: number;
}

export interface Bid {
  id: string;
  item: string;
  amount: number;
  status: 'Won' | 'Active' | 'Lost';
  time: string;
  placedAt: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}
