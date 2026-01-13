import numpy as np

def fedavg(weights_list):
    """
    FedAvg Aggregation
    weights_list = list of model weight arrays from clients
    """
    avg_weights = []
    for weights in zip(*weights_list):
        avg_weights.append(np.mean(weights, axis=0))
    return avg_weights
