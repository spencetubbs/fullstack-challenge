import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, Paper, Typography } from '@mui/material';
import { getDealsByOrganization } from '../data/deal.api';
import { useQuery } from '@tanstack/react-query';
import { DealsByStatus } from '../data/deal.types';
import './DealBoard.scss';

export const DealBoard: React.FC = () => {
  // Using this to quickly set the order to show the status columns in the grid.
  // Would be better to get this from the database since I stored the statuses there.
  // Could even set the order in the database as a separate column instead of relying on id.
  const columnOrder = [
    'Build Proposal',
    'Pitch Proposal',
    'Negotiation',
    'In Progress',
    'Complete',
  ];

  // TODO: move this into a custom hook if I have time.
  const { data, isLoading, error } = useQuery({
    queryKey: ['deals'],
    queryFn: async (): Promise<DealsByStatus[]> => {
      const response = await getDealsByOrganization(1);
      return response;
    },
  });

  const [netValue, setNetValue] = useState(0)

  useEffect(() => {
    if (!data?.length) return;

    // Calculate the net value of all deals
    const net = data?.reduce((sum, s) => {
      const val = s.total_value
      return sum + val;
    }, 0);

    setNetValue(net);
  }, [data])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Basic loading and error messages
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data loaded</div>;

  return (
    <Box id='deal-board' sx={{ flexGrow: 1, padding: 2 }}>
      <Box className='header'>
        <Typography className='title' variant="h4">Deals</Typography>
        <Card className='net-value'>Net Value: {formatCurrency(netValue)}</Card>
      </Box>
      <Divider className='divider' />
      <Grid container spacing={2}>
        {[...data].sort((a, b) => columnOrder.indexOf(a.status) - columnOrder.indexOf(b.status))
          .map((col) => (
            <Grid key={col.status}>
              <Paper className='column' elevation={3}>
                <Typography variant="h6">{col.status}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{formatCurrency(col.total_value)}</Typography>
                {col.deals.map((deal, index) => (
                  <Card key={index} className='deal-info'>
                    <CardContent>
                      <Typography>{deal.account}</Typography>
                      <Typography variant="body2" color="text.secondary">{formatCurrency(deal.value)}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
